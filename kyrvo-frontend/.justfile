set windows-powershell := true
set dotenv-load := true
_default:
  @just --list

build:
  docker compose up build

dev:
  docker compose up dev
