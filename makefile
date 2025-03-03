CARGO_BUILD_JOBS ?= $(shell nproc --ignore=2)
run:
	CARGO_BUILD_JOBS=$(CARGO_BUILD_JOBS) pnpm tauri dev
	
build:
	CARGO_BUILD_JOBS=$(CARGO_BUILD_JOBS) pnpm tauri build
