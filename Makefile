git:
	git submodule update --init --recursive

setup: git package.json
	npm install

setupnpm:
	npm install

PROD_OPTIONS=-e production --config config.toml,config_prod.toml --minify
DEV_OPTIONS=-e development --config config.toml,config_dev.toml
LOCAL_OPTIONS=-e development --config config.toml,config_local.toml
PR_OPTIONS=-D $(PROD_OPTIONS) --config config.toml,config_pr.toml
SERVE_OPTIONS=--baseURL http://localhost

clean:
	rm -rf public resources dist

purge:
	npm cache clean --force && hugo mod clean --all && rm -rf public resources dist node_modules themes/docsy/* themes/docsy/.[a-zA-Z0-9]* .hugo_build.lock

build-prod: clean setup
	hugo $(PROD_OPTIONS)

build-dist: clean setup
	hugo $(LOCAL_OPTIONS) -d dist

build-dist-pr: setupnpm
	hugo $(LOCAL_OPTIONS) -d dist

htmltest: clean setup
	hugo $(LOCAL_OPTIONS) -d dist
	htmltest

htmltest-fast: setup
	hugo $(LOCAL_OPTIONS) -d dist
	htmltest

coveragetest:
	python3 .github/workflows/update_sdk_methods.py --coverage -vv

markdowntest:
	markdownlint --config .markdownlint.yaml

flake8test:
	flake8-markdown docs/**/*.md

build-pr: clean setup
	hugo $(PR_OPTIONS)

build-pr-no-clean: setupnpm
	hugo $(PR_OPTIONS)

serve-prod: setup
	hugo server $(PROD_OPTIONS) $(SERVE_OPTIONS)

serve-prod-draft: setup
	hugo server -D $(PROD_OPTIONS) $(SERVE_OPTIONS)

serve-prod-future: setup
	hugo server -F $(PROD_OPTIONS) $(SERVE_OPTIONS)

serve-dev: setup
	hugo server $(DEV_OPTIONS) $(SERVE_OPTIONS)

serve-dev-draft: setup
	hugo server -D $(DEV_OPTIONS) $(SERVE_OPTIONS)

serve-dev-future: setup
	hugo server -F $(DEV_OPTIONS) $(SERVE_OPTIONS)

prettierfix: setup
	./node_modules/prettier/bin/prettier.cjs --check docs/**/*.md --fix --write
