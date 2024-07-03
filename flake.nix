{
  inputs = {
    # Nix
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    systems.url = "github:nix-systems/default";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.systems.follows = "systems";
    };
    pre-commit-hooks = {
      url = "github:cachix/pre-commit-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    devenv = {
      url = "github:cachix/devenv";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.pre-commit-hooks.follows = "pre-commit-hooks";
    };
  };

  outputs = { self, nixpkgs, systems, flake-utils, pre-commit-hooks, devenv
    , fenix, ... }@inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        hooks = {
          actionlint.enable = true;
          beautysh.enable = true;
          check-added-large-files.enable = true;
          eslint.enable = true;
          nil.enable = true;
          nixfmt = {
            enable = true;
            package = pkgs.nixfmt-classic;
          };
          shellcheck.enable = false;
        };

        deps = with pkgs; [
          slides
          asciinema
          asciinema-agg
          asciinema-scenario
          uutils-coreutils-noprefix
          terminal-notifier
        ];

      in rec {
        packages = {
          devenv-up = self.devShells.${system}.default.config.procfileScript;
          default =
            import ./. { inherit (pkgs) lib buildNpmPackage importNpmLock; };
        };

        apps = {
          default = {
            type = "app";
            program = "${packages.default}/bin/metagenda";
          };
        };

        devShells = {
          default = devenv.lib.mkShell {
            inherit inputs pkgs;
            modules = [{
              # https://devenv.sh/reference/options/
              packages = with pkgs; [
                nil
                nixfmt-classic
                obs-cmd
                prefetch-npm-deps
              ];

              languages = {
                nix.enable = true;
                typescript.enable = true;
                javascript = {
                  enable = true;
                  npm.enable = true;
                  npm.install.enable = true;
                };
                python = {
                  enable = true;
                  venv = {
                    quiet = true;
                    requirements = "auto-editor";
                  };
                };
              };

              delta.enable = true;
              dotenv.disableHint = true;
              difftastic.enable = true;
              pre-commit.hooks = hooks;
            }];
          };
        };

        checks = {
          pre-commit = pre-commit-hooks.lib.${system}.run {
            src = ./.;
            inherit hooks;
          };
        };
      });

  nixConfig = {
    extra-trusted-public-keys =
      "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };
}
