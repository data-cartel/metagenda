{ lib, buildNpmPackage, importNpmLock }:

buildNpmPackage rec {
  pname = "metagenda-cli";
  version = "0.1.0";
  src = ./.;

  # The prepack script runs the build script, which we'd rather do in the build phase.
  npmPackFlags = [ "--ignore-scripts" ];
  NODE_OPTIONS = "--openssl-legacy-provider";
  npmDeps = importNpmLock { npmRoot = ./.; };
  npmConfigHook = importNpmLock.npmConfigHook;
  npmWorkspace = "cli";
}
