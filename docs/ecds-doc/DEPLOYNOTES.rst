.. _DEPLOYNOTES:

Installation
============

Software dependencies
---------------------

We recommend the use of `pip <http://pip.openplans.org/>`_ and `virtualenv
<http://virtualenv.openplans.org/>`_ for environment and dependency management
in this and other Python projects. If you don't have them installed we
recommend ``sudo easy_install pip`` and then ``sudo pip install virtualenv``.

Configure the environment
~~~~~~~~~~~~~~~~~~~~~~~~~

When first installing this project, you'll need to create a virtual environment
for it. The environment is just a directory. You can store it anywhere you
like; in this documentation it'll live right next to the source. For instance,
if the source is in ``/home/httpd/voyages/src``, consider creating an
environment in ``/home/httpd/voyages/env``. To create such an environment, su
into apache's user and::

  $ virtualenv --no-site-packages /home/httpd/voyages/env

This creates a new virtual environment in that directory. Source the activation
file to invoke the virtual environment (requires that you use the bash shell)::

  $ . /home/httpd/voyages/env/bin/activate

Once the environment has been activated inside a shell, Python programs
spawned from that shell will read their environment only from this
directory, not from the system-wide site packages. Installations will
correspondingly be installed into this environment.

Install needed packages using system package manage (e.g. for Ubuntu)::

  $ apt-get install libjpeg-dev libjpeg62 libjpeg62-dev zlib1g-dev libpng12-dev libfreetype6-dev  libjpeg8-dev

.. Note::
  Installation instructions and upgrade notes below assume that
  you are already in an activated shell.


Install python dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Voyages depends on several python libraries. The installation is mostly
automated, and will print status messages as packages are installed. If there
are any errors, pip should announce them very loudly.

Some packages require compilation and for that one needs gcc installed.
Other required system packages are libxml2-dev and libxslt-dev
Another requirement is mysql_config 
  $ sudo apt-get install libmysqlclient-dev)
and python-dev
  $ sudo apt-get install python-dev

To install python dependencies, cd into the repository checkout and::

  $ pip install -r requirements.txt

If you are a developer or are installing to a continuous ingration server
where you plan to run unit tests, code coverage reports, or build sphinx
documentation, you probably will also want to::

  $ pip install -r requirements/dev.txt

After this step, your virtual environment should contain all of the
needed dependencies.

Solr
~~~~~~~~~~~~~~~

Voyages uses `Solr <http://lucene.apache.org/solr/>`_
for searching and indexing Fedora content. The Solr schema
included with the source code at ``solr/schema.xml`` should be used as the
Solr schema configuration. For convenience, this directory also contains a
sample ``solrconfig.xml`` and minimal versions of all other solr
configuration files used by the index.

Details:
After installing solr, create the 'voyages' core with:

  $ sudo su solr
  [solr]$ solr create -c voyages -d src/voyages/solr/
    locate the folder where solr stores the core's config files (in the version tested it was <solr path>/server/solr/voyages/conf)
    and 
  [solr]$ cp src/voyages/solr/managed_schema.xml src/voyages/solr/solrconfig.xml src/voyages/solr/mapping-ISOLatin1Accent.txt src/voyages/solr/protwords.txt src/voyages/solr/stopwords.txt src/voyages/solr/synonyms.txt <core config path>
    check if <core config path>/lang/ exists (and stopwords_en.txt in it), if not:
  [solr]$ cp src/voyages/solr/stopwords_en.txt src/voyages/solr/stopwords_pt.txt src/voyages/solr/stopwords_es.txt <core config path>/lang/


The url for accessing the configured Solr instance should be set in
``localsettings.py`` as **HAYSTACK_CONNECTIONS**

Install the application
-----------------------

Apache
~~~~~~

After installing dependencies, copy and edit the wsgi and apache
configuration files in src/apache inside the source code checkout. Both may
require some tweaking for paths and other system details.

Configuration
~~~~~~~~~~~~~

Configure application settings by copying ``localsettings.py.dist`` to
``localsettings.py`` and editing for local settings (database, etc.).

After configuring all settings, initialize the db with all needed
tables and initial data using::

  $ python manage.py migrate

In addition, these sets of initial data need to be loaded (Please load in this order)

Before loading data comment the `HAYSTACK_SIGNAL_PROCESSOR` variable out in the `localsettings`::

  #HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'

Updating data fixtures
----------------------

The data fixtures in this repository may be outdated with respect to the
latest production data. To update these files a convenient script has been
placed under tools: get_dumpdata_commands. Running this command will
yield all the dumpdata commands that should be executed on the prod server
to generate updated versions of the fixture files. Copy these files over
to initialdata/overwriting the old files. Make notice of the size of
this files and use a compressed version (zip/bz2) whenever the file
is large.

Importing data fixtures
-----------------------

Some files in the repository may be compacted since the json format
is wasteful. Expand these files before running the commands below.

Run these commands to load all the data fixtures except images.json::

  $ python manage.py loaddata initialdata/glossary.json
  $ python manage.py loaddata initialdata/lessonplan_data.json
  $ python manage.py loaddata initialdata/flatpages.json
  $ python manage.py loaddata initialdata/groupings.json
  $ python manage.py loaddata initialdata/users.json
  $ python manage.py loaddata initialdata/geographical.json
  $ python manage.py loaddata initialdata/shipattributes.json
  $ python manage.py loaddata initialdata/outcomes.json
  $ python manage.py loaddata initialdata/faq_all.json
  $ python manage.py loaddata initialdata/sources.json
  $ python manage.py loaddata initialdata/resource_countries.json
  $ python manage.py loaddata initialdata/sites.json
  $ python manage.py loaddata initialdata/social.json
  $ python manage.py loaddata initialdata/estimates_starter.json
  $ python manage.py loaddata initialdata/estimates.json
  $ python manage.py loaddata initialdata/static_content.json

Import data from SPSS generated CSV

  $ python manage.py importcsv [--db=mysql or pgsql] csv_file
  
  OR, ALTERNATIVELY, use the voyages.json fixtures to initialize the main tables

  $ python manage.py loaddata initialdata/voyages.json

Load african names after the voyages are created (since the names reference voyages).

  $ python manage.py loaddata initialdata/african_names.json

Now load the images.json file::

  $ python manage.py loaddata initialdata/images.json


After loading data uncomment the `HAYSTACK_SIGNAL_PROCESSOR` variable in the `localsettings`:

  HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'


To initalize the Solr data the following manage command should be run. If errors occur,
try patching the fields.py file as described in the next section (Haystack patch).

  $ python manage.py rebuild_index

Documents of lessonplan, Images, Download files have to be copied to the global location.
Since this is a one time process per environment,they should be coppied manually.
Change into the root directory of the project and perform the following commands::

  $ cp -pr documents/* <localsettings.MEDIA_ROOT>



To cleanup the thumbnail image cache run::

  $ python manage.py thumbnail cleanup

Haystack patch
~~~~~~~~~~~~~~

Haystack deals poorly with our index and in some cases it prevents proper behavior of this app.
A simple patch is available at doc/fields.py. Just determine the virtualenv path in which the
app will be run (after installing all python dependencies in that same virtualenv) and locate
'/lib/python2.7/site-packages/haystack/fields.py'. For safety, generate a diff between the
the lib version against and the one at doc/fields.py. Only a few lines should have changed.
Replace the file on the local library and the patching is done.

Creating initial data
^^^^^^^^^^^^^^^^^^^^^
* Users are entered manually (through the admin interface) or via JSON file: users.json

* Lesson plans are entered manually or via JSON file: lessonplan_data.json.

* Glossary is entered manually or via JSON file: glossary.json .

* FAQ is entered manually or via JSON file: faq_all.json .

.. Note::
  since category has to be exported before actual FAQ.
  (database consistency/foreign-key constraint)
  When exporting data, please run::

      $ ./manage.py dumpdata help.faqcategory help.faq > initialdata/faq_all.json


* Downloads is entered manually via the admin interface.
  HTML code for static pages like download can be pasted in the admin interface.
  (Use HTML code not rich text editor.)

* Voyage
    * Creating data from legacy mySQL
      Export the following tables with the following format: TABBED format!
      (Select EXPORT option in SQL admin, make sure TAB is not used elsewhere in SQL field)
      Export the following tables into a directory csvdumps/

        * Table areas into broadregion.txt
        * Table regions into region.txt
        * Table ports into place.txt
        * Table owner_outcome into owner_outcome.txt
        * Table slave_outcome into slave_outcome.txt
        * Table vessel_outcome into vessel_outcome.txt
        * Table resistance into resistance.txt
        * Table nations into nation.txt
        * Table vessel_rigs into rigofvessel.txt
        * Table sources into source.txt
        * Table ton_type into ton_type.txt
        * Table xmimpflag into groupings.txt
        * Table voyages into voyage.txt

    * Then run::

        $ ./manage.py shell

      In the shell execute::

        $ execfile('csvdumps/load_all_data.py')

      .. Note::
        If in the middle of any smaller load file, the load fails,
        manually cd (change directory to csvdumps) and resume execution
        (open load_all_data.py to see the order of loading)

      .. Note::
        voyage with voyageid=51655 has an extra tab character in 1 field that needs to removed,
        otherwise the voyage will not appear in the result

* Images
    * Creating data from legacy mySQL
        * (Select EXPORT option in SQL admin)
          Export the following tables with the following format: TABBED format.

            * Table images into images.txt
            * Table images_voyages into images_voyage.txt
            * Table image_categories into images_category.txt

        * Then run::

            $ ./manage.py shell

          In the shell execute::

            $ execfile('csvdumps/load_all_images.py')

          .. Note::
            On exporting data, please run::

             $ ./manage.py dumpdata voyage.imageCategory voyage.image  > initialdata/images.json
             
            since category has to be exported before actual FAQ.
            (database consistency/foreign-key constraint)

Multilanguage support
---------------------
Enable multilanguage support:
in template/secondarybar.html uncomment section for multilang support (Line 29-47)

Add/Remove supported languages from settings.py::

  LANGUAGE_CODE='en'   <--- Default language
  LANGUAGES = (
    ('en', gettext('English')),
    ('de', gettext('German')),
    ('fr', gettext('French')),
    ('es', gettext('Spanish')),
  )


Mark text to be translated in template:

* Make sure to include {% load i18n %} on the top of the template
* Single line/short string: surround by {% trans 'String to be translated' %}
  Block translation: surround by {% blocktrans %}  and {% endblocktrans %}
* Actual language file:
  To create or update files: django-admin.py makemessages -l de
  ("de" can be replaced by the actual language code)
  The file will be located in voyages/locale/de/LC_MESSAGES/django.po
  for German language for instance

  Inside the file:
  #: path/to/python/module.py:23
  msgid "Welcome to my site."
  msgstr ""
  The msgstr is the translation that will show up for msgid.
  If empty, the default msgid will be used.

* Execute the following to compile translated messages::

   $ ./manage.py compilemessages

  See more information on https://docs.djangoproject.com/en/1.6/topics/i18n/translation/

Captchas
------------------------------------------------

apt-get -y install libz-dev libjpeg-dev libfreetype6-dev python-dev

Extra tools: (residing in voyages/extratools.py)
------------------------------------------------
Custom highlighter::
Current settings in settings.py::

    HAYSTACK_CUSTOM_HIGHLIGHTER = 'voyages.extratools.TextHighlighter'

Use to highlight SOLR result for FAQ and Glossary
(the default highlighter used by haystack will truncate the text).

**TinyMCE editor** known as AdvancedEditor: gives the user rich text editor interface
``scripts/tiny_mce/tinymce.min.js`` contains the core javascript for tinymce to function
``scripts/tiny_mce/textareas_small.js`` contains the customization or the page
selector gives the option to replace which text area to replace with TinyMCE
plugins give the list of enabled plugins
This is used to replace widget in customized form.
Usage (example)::

      In forms.py:
           field_name = forms.CharField(widget=AdvancedEditor(attrs={'class' : 'tinymcetextarea'}))

Cron jobs
~~~~~~~~~

Session cleanup
^^^^^^^^^^^^^^^

The application uses database-backed sessions. Django recommends
periodically `clearing the session table <https://docs.djangoproject.com/en/1.3/topics/http/sessions/#clearing-the-session-table>`_
in this configuration. To do this, set up a cron job to run the following
command periodically from within the application's virtual environment::

  $ manage.py cleanup

This script removes any expired sessions from the database. We recommend
doing this about every week, though exact timing depends on usage patterns
and administrative discretion.
