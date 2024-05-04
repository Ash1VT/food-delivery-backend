#!/usr/bin/env sh

PROTOC="$(yarn bin)/grpc_tools_node_protoc"

PROTOC_GEN_GRPC_PATH="$(yarn bin)/grpc_tools_node_protoc_plugin"

IN_DIR="protos/roles"
JS_OUT_DIR="dist/src/grpc/generated"

if [ -d $JS_OUT_DIR ]; 
  then
    rm -rf $JS_OUT_DIR
    mkdir $JS_OUT_DIR
  else
    mkdir $JS_OUT_DIR
fi

# Generate JavaScript GRPC client
$PROTOC -I=./protos "$IN_DIR"/roles.proto \
  --plugin=protoc-gen-grpc=$PROTOC_GEN_GRPC_PATH \
  --js_out=import_style=commonjs,binary:$JS_OUT_DIR \
  --grpc_out=grpc_js:$JS_OUT_DIR