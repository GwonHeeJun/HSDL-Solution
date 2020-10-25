import { prisma } from "../../prisma/generated/prisma-client";

export const BusList = async (ctx) => {
  const res = await prisma.transportations({ where: { type: "Bus" } });
  ctx.body = res;
  ctx.status = 200;
  return;
};

export const SubwayList = async (ctx) => {
  const res = await prisma.transportations({ where: { type: "Subway" } });
  ctx.body = res;
  ctx.status = 200;
  return;
};

export const DetectiveNonMask = async (ctx) => {
  try {
    await prisma.createDetectivePlace({
      transportation: { connect: { id: ctx.request.body.transportId } },
      placeName: ctx.request.body.placeName,
      placeCode: ctx.request.body.placeCode,
    });

    const port = await prisma.transportation({ id : ctx.request.body.transportId })

    const result = await prisma.updateTransportation({
      where: { id: ctx.request.body.transportId },
      data: { detectiveCount : port.detectiveCount + 1 },
    });

    ctx.body = result;
    ctx.status = 200;
    return;
  } catch (e) {
    ctx.body = e;
    ctx.status = 400;
    return;
  }
};

export const BusDetail = async (ctx) => {
  const res = await prisma.transportation({ id: ctx.params.id });
  ctx.body = res;
  ctx.status = 200;
  return;
};

export const SubwayDetail = async (ctx) => {
  const res = await prisma.transportation({ id: ctx.params.id });
  ctx.body = res;
  ctx.status = 200;
  return;
};
