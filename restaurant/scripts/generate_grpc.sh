#!/bin/bash

IN_DIR="protos/roles"
OUT_DIR=./src/grpc_files/generated

if [ -d $OUT_DIR ]; 
  then
    rm -rf $OUT_DIR
    mkdir $OUT_DIR
  else
    mkdir $OUT_DIR
fi

venv/Scripts/python.exe -m grpc_tools.protoc -I./protos --python_out=$OUT_DIR --pyi_out=$OUT_DIR --grpc_python_out=$OUT_DIR "$IN_DIR"/roles.proto