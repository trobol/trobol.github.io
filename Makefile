
help: ## help
	@grep -E '(^##)|(\s##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = "(:.*?)?## "}; {if ($$1) { printf "  %-30s %s\n", $$1, $$2 } else { printf "\n%s\n", $$2 }}'





serve: ## start debug server
	hugo server 

.PHONY: serve

HUGO_VERSION := $(shell hugo version 2>/dev/null)

all:
ifndef HUGO_VERSION
    $(error "required dependency 'hugo' missing")
endif