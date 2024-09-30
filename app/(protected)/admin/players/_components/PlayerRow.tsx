import React from "react";
import { PLAYER } from "@/lib/types";
import { convertToHumanReadable } from "@/lib/helper";
import ActionMenu from "@/components/ActionMenu";
import moment from "moment";

export type BillingType = {
  id: number;
  total: string;
  date: string;
  status: string;
  unique: string;
};

type Props = {
  player: PLAYER;
  isSelected: boolean;
  toggleSelectPlayer: (id: string) => void;
};

const PlayerRow = ({ player, isSelected, toggleSelectPlayer }: Props) => {
  return (
    <tr className="border-b h-20">
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelectPlayer(player._id)}
        />
      </td>
      <td>{player.name}</td>
      <td>{player.email}</td>
      <td>{player.phone}</td>
      <td>{player.address}</td>
      {/* <td>{convertToHumanReadable(player.createdDate)}</td> */}
      <td>{moment(player.createdDate).format("MMMM Do YYYY, h:mm:ss A")}</td>

      <td>
        <span
          className={`${
            player.status === "Active"
              ? "bg-green-100 text-green-800"
              : player.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          } px-2 py-1 rounded-full`}
        >
          {player.status}
        </span>
      </td>
      <td>
        <ActionMenu />
      </td>
    </tr>
  );
};

export default PlayerRow;
