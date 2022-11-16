import React from "react";
import { Stack } from "@mui/system";
import ArchiveItem from "../../items/ArchiveItem";
import { testArchives } from "./test";
import { QueryGet } from "../../../apiConnection/gen/models/query-get";

type Props = {
  data: QueryGet[];
};

export default function ArchiveList({ data }: Props) {
  console.log('RECIEVED DATA', data);
  return (
    <Stack sx={{ gap: "20px" }}>
      {data.map((item) => (
        <ArchiveItem key={item.guid} item={item} />
      ))}
    </Stack>
  );
}
