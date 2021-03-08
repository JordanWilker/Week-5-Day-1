import express from "express";
import BaseController from "../utils/BaseController";
import { borgersService } from "../services/BorgerService";
import { FAKEDB } from "../db/FAKEDB";

export class BorgersController extends BaseController {
  constructor() {
    super("api/borgers");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .post("", this.create)
      .delete("/:id", this.delete)
      .put("/:id", this.edit)
  }

  async getOne(req, res, next) {
    try {
      res.send(borgersService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let editedBorger = req.body
      // editedBorger.id = req.params.id
      const borger = borgersService.edit(editedBorger, req.params.id)
      res.send(borger)
    } catch (error) {
      next(error)
    }
  }
  
  async getAll(req, res, next) {
      try {
        const borgers = borgersService.getAll()
      res.send(borgers);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      let newBorger = req.body
      const borger = borgersService.create(newBorger)
      res.status(201).send({data: borger, message:"Borger created!", count: FAKEDB.borgers.length});
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id
      borgersService.delete(id)
      res.send("Borger delorted")
    } catch (error) {
      next(error)
    }
  }

}