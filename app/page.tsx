"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/Pagination/Pagination";
import { ImageOff, VideoOff, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchField } from "@/components/SearchField/SearchField";
import { debounce } from "@/lib/utils";
import { ChartPie } from "@/components/ChartPie/ChartPie";
import { ChartBar } from "@/components/ChartBar/CharBar";
import { useSearchOptions } from "@/hooks/useSearchOptions";
import { useQueries } from "@/hooks/useQueries";
import { useData } from "@/hooks/useData";

enum Head {
  FLIGHT_NUMBER = "Nº Vôo",
  LOGO = "Logo",
  MISSION = "Missão",
  DATE_LAUNCH = "Data de lançamento",
  ROCKET_NAME = "Foguete",
  RESULT = "Resultado",
  VIDEO = "Vídeo",
}

export default function Home() {
  const {data,page,setData,setPage,dataClear} = useData()
  const {searchOptions, setSearchOptions} = useSearchOptions()
  const heads = Object.values(Head);
  const formatter = new Intl.DateTimeFormat();

  const [searchValue, setSearchValue] = React.useState("");
  const {queries,clearQueries,setQueries} = useQueries()

  const handleSetSearchValue = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  React.useEffect(() => {
    setData(queries,page)
  }, [page, queries, setData]);
  

  React.useEffect(() => {
    if(searchValue === "") {
      dataClear()
      clearQueries(searchValue)
    }
  },[clearQueries, dataClear, searchValue])

  React.useEffect(() => {
    setSearchOptions()
  }, [setSearchOptions]);

  return (
    <div>
      <div className="flex justify-center items-center gap-3 m-10 text-3xl bold">
        <Rocket className="w-10 h-10"/>
        <h1>Space X</h1>
      </div>
      <div className="flex sm:flex-row flex-col gap-5 items-center justify-center">
        <ChartPie />
        <ChartBar />
      </div>
      <div className="m-10">
        <label htmlFor="search" className="my-3 block">
          Registro de lançamentos
        </label>
        <SearchField
          id="search"
          value={searchValue}
          search={searchOptions}
          onChange={handleSetSearchValue}
          setQuery={setQueries}
          setPage={setPage}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-[90%]">
          <Table>
            <TableHeader>
              <TableRow>
                {heads.map((head) => (
                  <TableHead key={head}>{head}</TableHead>
                ))}
                {/* <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.results.map((launch) => (
                  <TableRow key={launch._id}>
                    <TableCell>{launch.flight_number}</TableCell>
                    <TableCell>
                      {launch.logo.small ? (
                        <img
                          width={50}
                          src={launch.logo.small}
                          alt={launch.name}
                        />
                      ) : (
                        <ImageOff />
                      )}
                    </TableCell>
                    <TableCell>{launch.name}</TableCell>
                    <TableCell>
                      {formatter.format(new Date(launch.date_utc))}
                    </TableCell>
                    <TableCell>{launch.rocket.name}</TableCell>
                    <TableCell>
                      {launch.success === true ? (
                        <Badge
                          variant="default"
                          className="bg-[rgb(40,167,69)] hover:bg-[rgb(40,167,69,.8)]"
                        >
                          Sucesso
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Falha</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger>Play</DialogTrigger>
                        <DialogContent className="h-[300px]">
                          {launch.webcast ? (
                            <iframe
                              width="300"
                              height="500"
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${
                                launch.webcast.match(/[?&]v=([^&]+)/) ||
                                launch.webcast.split("/")[3]
                              }`}
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <div className="flex flex-col items-center justify-center">
                              <VideoOff className="w-[50%] h-[50%]" />
                              <p>Esse lançamento não foi registrado</p>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              {/* <TableRow> */}
              {/* <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell> */}
              {/* </TableRow> */}
            </TableBody>
          </Table>
          <div className="flex justify-center m-10">
            {data && (
              <Pagination
                page={data.page}
                totalDocs={data.totalDocs}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
