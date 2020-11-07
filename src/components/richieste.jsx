import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

import Table from "./common/table";

import { get } from "./../services/richiesteService";
import { decodeError } from "./../util/decode";
import { useHistory } from "react-router-dom";

function Richieste() {
  const [allRichieste, setAllRichieste] = useState([]);
  const [sortedColumn, setSortedColumn] = useState({
    path: "priorita",
    order: "asc",
  });
  const history = useHistory();

  const columns = [
    { path: "priorita", value: "Prior" },
    { path: "descrizione", value: "Descrizione" },
    { path: "creatore.name", value: "Creatore" },
    { path: "tipo.name", value: "Tipo" },
    { path: "stato.name", value: "Stato" },
  ];

  const handleOnSort = (newSortColoumn) => {
    setSortedColumn(newSortColoumn);
  };

  const getRichieste = async () => {
    try {
      const { data: richieste } = await get();
      setAllRichieste(richieste);
      console.log(richieste);
    } catch (e) {
      if (e.response && e.response.data)
        toast.error(decodeError(e.response.data));
    }
  };

  useEffect(() => {
    getRichieste();
  }, []);

  const handleClickRow = (richiesta) => {
    history.push(`/richieste/${richiesta._id}`);
  };

  return (
    <Table
      columns={columns}
      data={allRichieste}
      sortedColumn={sortedColumn}
      onSort={handleOnSort}
      onClickRow={handleClickRow}
    />
  );
}

export default Richieste;
