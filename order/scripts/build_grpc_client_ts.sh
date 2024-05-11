PROTOC="$(yarn bin)/grpc_tools_node_protoc"

PROTOC_GEN_TS_PATH="$(yarn bin)/protoc-gen-ts"

IN_DIR="protos/roles"
TS_OUT_DIR="src/grpc/generated"

if [ -d $TS_OUT_DIR ]; 
  then
    rm -rf $TS_OUT_DIR
    mkdir $TS_OUT_DIR
  else
    mkdir $TS_OUT_DIR
fi

# Generate TypeScript GRPC client
$PROTOC -I=./protos "$IN_DIR"/roles.proto \
  --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
  --ts_out=service=grpc-node,mode=grpc-js:$TS_OUT_DIR