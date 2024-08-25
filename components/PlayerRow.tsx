import React from "react";
import ActionMenu from "./ActionMenu";

export type PlayerType = {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  date: string;
  status: string;
};

type Props = {
  player: PlayerType;
  isSelected: boolean;
  toggleSelectPlayer: (id: number) => void;
};

const PlayerRow = ({ player, isSelected, toggleSelectPlayer }: Props) => {
  return (
    <tr className="border-b h-20">
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelectPlayer(player.id)}
        />
      </td>
      <td>{player.name}</td>
      <td>{player.email}</td>
      <td>{player.contact}</td>
      <td>{player.address}</td>
      <td>{player.date}</td>
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
