import React from "react";
import Joi from "joi-browser";

import Form from "./common/form";

import { toast } from "react-toastify";

import * as richiestaService from "../services/richiesteService";
import * as tipiService from "../services/tipiService";
import * as userService from "../services/userService";
import * as statiService from "../services/statiService";

class RichiesteForm extends Form {
  state = {
    data: {
      idRichiesta: "",
      descrizione: "",
      idTipo: "",
      idStato: "",
      idResponsabili: [],
      note: "",
      avanzamento: 0,
      priorita: 99,
      dataCreazione: 0,
    },
    errors: {},
    allTipi: [],
    allStati: [],
    allDeveloper: [],
    allUser: [],
  };
  getRichiesta = async () => {
    try {
      const { data: richiesta } = await richiestaService.getById(
        this.props.match.params.id
      );
      console.log(richiesta);
      let richiestaState = {};
      richiestaState.idRichiesta = richiesta._id;
      richiestaState.descrizione = richiesta.descrizione;
      richiestaState.idTipo = richiesta.tipo._id;
      richiestaState.idStato = richiesta.stato._id;
      richiestaState.idResponsabili = richiesta.responsabili.map((e) => e._id);
      richiestaState.note = richiesta.note;
      richiestaState.avanzamento = richiesta.avanzamento;
      richiestaState.priorita = richiesta.priorita;
      richiestaState.dataCreazione = richiesta.dataCreazione.substring(0, 16);

      console.log(richiestaState);
      this.setState({ data: richiestaState });
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };
  getAllUsers = async () => {
    try {
      const { data: allUser } = await userService.get();
      const allDeveloper = allUser.filter((e) => e.roles.includes("DEVELOPER"));
      this.setState({ allUser, allDeveloper });
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };
  getAllTipi = async () => {
    try {
      const { data: allTipi } = await tipiService.get();
      this.setState({ allTipi });
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };
  getAllStati = async () => {
    try {
      const { data: allStati } = await statiService.get();
      this.setState({ allStati });
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };

  componentDidMount() {
    this.getRichiesta();
    this.getAllUsers();
    this.getAllStati();
    this.getAllTipi();
  }

  doSubmit = async () => {
    try {
      console.log(this.state.data);
    } catch (err) {
      if (err.response && err.response.status === 400)
        toast.error(err.response.data);
    }
  };

  schema = {};
  render() {
    return (
      <div>
        <h1>Richiesta</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("descrizione", "Descrizione")}
          {this.renderInput("idTipo", "Tipo")}
          {this.renderInput("idStato", "Stato")}
          {this.renderInput("dataCreazione", "Creazione", "datetime-local", {
            readonly: true,
          })}
          {this.renderInput("priorita", "Priorita'", "number")}
          {this.renderButton("ok")}
        </form>
      </div>
    );
  }
}

export default RichiesteForm;
