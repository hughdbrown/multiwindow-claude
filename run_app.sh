#!/bin/sh

set -euxo
set -o pipefail

uvicorn main:app --reload
