import React, { useState, useEffect } from "react";
import Joi from "joi-browser";

import { toast } from "react-toastify";

import * as richiestaService from "../services/richiesteService";
import * as tipiService from "../services/tipiService";
import * as userService from "../services/userService";
import * as statiService from "../services/statiService";
import Input from "./common/input";
import Select from "./common/select";
import MultipleInput from "./common/multipleInput";

function RichiesteForm(props) {
  const [richiesta, setRichiesta] = useState({
    idRichiesta: "",
    descrizione: "",
    idTipo: "",
    idStato: "",
    idResponsabili: [],
    note: "",
    avanzamento: 0,
    priorita: 99,
    dataCreazione: 0,
  });
  const [errors, setErrors] = useState({});
  const [allTipi, setAllTipi] = useState([]);
  const [allStati, setAllStati] = useState([]);
  const [allDeveloper, setAllDeveloper] = useState([]);
  const schema = {
    descrizione: Joi.string().required().min(4).max(50),
    idTipo: Joi.string().required(),
    idStato: Joi.string().required(),
    idResponsabili: Joi.array().items(Joi.string()).required(),
    note: Joi.string().max(100),
    avanzamento: Joi.number().min(0).max(100),
    priorita: Joi.number().min(0).max(100),
  };

  const getRichiesta = async (id) => {
    try {
      const { data: richiestaDb } = await richiestaService.getById(id);
      let richiestaState = {};
      richiestaState.idRichiesta = richiestaDb._id;
      richiestaState.descrizione = richiestaDb.descrizione;
      richiestaState.idTipo = richiestaDb.tipo._id;
      richiestaState.idStato = richiestaDb.stato._id;
      richiestaState.idResponsabili = richiestaDb.responsabili.map(
        (e) => e._id
      );
      richiestaState.note = richiestaDb.note;
      richiestaState.avanzamento = richiestaDb.avanzamento || 0;
      richiestaState.priorita = richiestaDb.priorita;
      richiestaState.dataCreazione = richiestaDb.dataCreazione.substring(0, 16);
      setRichiesta(richiestaState);
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };
  const getAllUsers = async () => {
    try {
      const { data: utenti } = await userService.get();
      const developers = utenti.filter((e) => e.roles.includes("DEVELOPER"));
      setAllDeveloper(developers);
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };
  const getAllTipi = async () => {
    try {
      const { data: tipi } = await tipiService.get();
      setAllTipi(tipi);
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };
  const getAllStati = async () => {
    try {
      const { data: stati } = await statiService.get();
      setAllStati(stati);
    } catch (err) {
      if (err.response && err.response.data) toast.error(err.response.data);
    }
  };

  useEffect(() => {
    const ottieniTuttiDati = async (id) => {
      getAllUsers();
      if (id !== "new") getRichiesta(id);
      getAllStati();
      getAllTipi();
    };
    ottieniTuttiDati(props.match.params.id);
  }, [props.match.params.id]);

  const doSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(richiesta);
    } catch (err) {
      if (err.response && err.response.status === 400)
        toast.error(err.response.data);
    }
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propriertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propriertySchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const actualErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) actualErrors[input.name] = errorMessage;
    else delete actualErrors[input.name];

    const data = { ...richiesta };
    data[input.name] = input.value;
    setRichiesta(data);
    setErrors(actualErrors);
  };

  const handleAddResponsabile = (idResponsabile) => {
    let data = { ...richiesta };
    data.idResponsabili.push(idResponsabile);
    setRichiesta(data);
  };

  const handleRemoveResponsabile = (idResponsabile) => {
    let data = { ...richiesta };
    data.idResponsabili = data.idResponsabili.filter(
      (e) => e !== idResponsabile
    );
    setRichiesta(data);
  };

  return (
    <div>
      <h1>Richiesta</h1>
      <form onSubmit={doSubmit}>
        <Input
          name="descrizione"
          label="Descrizione"
          placeholder="Inserisci un breve descrizione..."
          value={richiesta.descrizione}
          onChange={handleChange}
          error={errors.descrizione}
        />

        <div className="form-row">
          <div className="col">
            <Select
              name="idTipo"
              label="Tipo"
              value={richiesta.idTipo}
              options={allTipi}
              onChange={handleChange}
              error={errors.idTipo}
            />
          </div>
          <div className="col">
            <Select
              name="idStato"
              label="Stato"
              value={richiesta.idStato}
              options={allStati}
              onChange={handleChange}
              error={errors.idStato}
            />
          </div>
          <div className="col">
            <Input
              name="avanzamento"
              label="Avanzamento %"
              value={richiesta.avanzamento}
              onChange={handleChange}
              error={errors.avanzamento}
              type="range"
              min="0"
              max="100"
            />
          </div>
          <div className="col">
            <Input
              name="priorita"
              label="Priorita'"
              value={richiesta.priorita}
              onChange={handleChange}
              error={errors.priorita}
              type="number"
              min={0}
              max={100}
            />
          </div>
        </div>
        <MultipleInput
          values={richiesta.idResponsabili}
          options={allDeveloper}
          name="idResponsabili"
          label="Responsabili"
          onAdd={handleAddResponsabile}
          onRemove={handleRemoveResponsabile}
        />
        <Input
          name="note"
          label="Note"
          placeholder="..."
          value={richiesta.note}
          onChange={handleChange}
          error={errors.note}
          type="textarea"
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        >
          Salva
        </button>
      </form>
    </div>
  );
}

export default RichiesteForm;
