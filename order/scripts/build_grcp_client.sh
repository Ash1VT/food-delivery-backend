PROTOC="$(yarn bin)/grpc_tools_node_protoc"
GEN_TYPES="$(yarn bin)/proto-loader-gen-types"

PROTOC_GEN_TS_PATH="$(yarn bin)/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH="$(yarn bin)/grpc_tools_node_protoc_plugin"
PROTOC_GEN_GRPC_WEB_PATH="$(yarn bin)/protoc-gen-grpc-web"

IN_DIR="protos/roles"
JS_OUT_DIR="dist/src/grpc/generated"
TS_OUT_DIR="src/grpc/generated"

# Generate Types
$GEN_TYPES --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=$TS_OUT_DIR $IN_DIR/roles.proto

# Generate Code
$PROTOC -I=./protos/roles "$IN_DIR"/roles.proto \
  --plugin=protoc-gen-grpc=$PROTOC_GEN_GRPC_PATH \
  --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
  --js_out=import_style=commonjs,binary:$JS_OUT_DIR \
  --grpc_out=grpc_js:$JS_OUT_DIR \
  --ts_out=service=grpc-node,mode=grpc-js:$TS_OUT_DIR