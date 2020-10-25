"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Transportation",
    embedded: false
  },
  {
    name: "TransportationType",
    embedded: false
  },
  {
    name: "DetectivePlace",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://us1.prisma.sh/gwonheejun-b421fb/HSDL-Solution/dev`
});
exports.prisma = new exports.Prisma();
