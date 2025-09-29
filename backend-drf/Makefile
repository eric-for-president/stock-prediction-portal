# Makefile (extended)
PYTHON := python3
VENV_DIR := ../.venv

PIP := $(VENV_DIR)/bin/pip
PY := $(VENV_DIR)/bin/$(PYTHON)
MANAGE := $(PY) manage.py
DJANGO_SETTINGS := DJANGO_SETTINGS_MODULE=project.settings
ENV ?= development
EXPORT_ENV := export ENV=$(ENV) &&

# tools
BLACK := $(VENV_DIR)/bin/black
ISORT := $(VENV_DIR)/bin/isort
FLAKE8 := $(VENV_DIR)/bin/flake8

.PHONY: help venv install deps upgrade-deps makemigrations migrate migrate-reset run run-prod shell createsuperuser \
        test lint format collectstatic loaddata dumpdata sqlmigrate clean rebuild

help:
	@printf "Common targets:\n"
	@printf "  make venv             - create virtualenv\n"
	@printf "  make install          - install requirements.txt\n"
	@printf "  make deps             - install dev dependencies (black,flake8,isort)\n"
	@printf "  make makemigrations   - create migrations\n"
	@printf "  make migrate          - apply migrations\n"
	@printf "  make migrate-reset    - flush DB & re-run migrations (destructive)\n"
	@printf "  make run              - run dev server (127.0.0.1:8000)\n"
	@printf "  make run-prod         - run with production settings (use with caution)\n"
	@printf "  make shell            - open Django shell\n"
	@printf "  make createsuperuser  - interactively create superuser\n"
	@printf "  make test             - run tests\n"
	@printf "  make lint             - run flake8\n"
	@printf "  make format           - run black + isort\n"
	@printf "  make collectstatic    - collect static files\n"
	@printf "  make loaddata <file>  - load fixture\n"
	@printf "  make dumpdata <app>   - dump app data\n"
	@printf "  make clean            - cleanup pyc, migrations (optional)\n"
	@printf "  make rebuild          - clean, reinstall, makemigrations, migrate\n"

venv:
	@test -d $(VENV_DIR) || $(PYTHON) -m venv $(VENV_DIR)
	$(PIP) install --upgrade pip setuptools wheel

install: venv
	$(PIP) install -r requirements.txt

deps: venv
	# install common dev tools (adjust as needed)
	$(PIP) install black isort flake8

upgrade-deps:
	$(PIP) install -U -r requirements.txt

migrations:
	$(MANAGE) makemigrations

migrate:
	$(MANAGE) migrate

migrate-reset:
	@printf "WARNING: destructive action — flushing database\n"
	$(MANAGE) flush --no-input
	$(MAKE) migrate

run:
	$(MANAGE) runserver

# Example to run with production settings:
run-prod:
	ENV=production $(DJANGO_SETTINGS) $(MANAGE) runserver 0.0.0.0:8000

shell:
	$(MANAGE) shell

superuser:
	$(MANAGE) createsuperuser

test:
	$(MANAGE) test

lint:
	$(FLAKE8) .

format:
	$(ISORT) .
	$(BLACK) .

collectstatic:
	$(MANAGE) collectstatic --noinput

loaddata:
	# usage: make loaddata file=fixtures/mydata.json
	@if [ -z "$(file)" ]; then echo "You must pass file=path/to/fixture.json"; exit 1; fi
	$(MANAGE) loaddata $(file)

dumpdata:
	# usage: make dumpdata app=appname out=appdata.json
	@if [ -z "$(app)" ]; then echo "You must pass app=<appname>"; exit 1; fi
	@if [ -z "$(out)" ]; then echo "You must pass out=<outputfile.json>"; exit 1; fi
	$(MANAGE) dumpdata $(app) --natural-primary --indent 2 > $(out)

sqlmigrate:
	# usage: make sqlmigrate app=appname migration=0001
	@if [ -z "$(app)" -o -z "$(migration)" ]; then echo "usage: make sqlmigrate app=<app> migration=<name>"; exit 1; fi
	$(MANAGE) sqlmigrate $(app) $(migration)

clean:
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -exec rm -rf {} +
	# optionally remove local migration files (be careful)
	# find . -path "*/migrations/*.py" -not -name "__init__.py" -delete

rebuild: clean install makemigrations migrate

