import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Items.module.css";

const Items = ({ task, onMark, onDelete, onEdit }) => {
  return (
    <ul className={styles.item}>
      <li>
        {task.status === "pending" ? (
          <p>{task.name}</p>
        ) : (
          <del>{task.name}</del>
        )}
        <div>
          <button
            onClick={() => {
              onMark(task.id);
            }}
          >
            <FontAwesomeIcon
              icon={faCheck}
              style={{ color: "#28A745", cursor: "pointer" }}
            />
          </button>
          <button
            onClick={() => {
              onEdit(task.id);
            }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#FFC107", cursor: "pointer" }}
            />
          </button>
          <button
            onClick={() => {
              onDelete(task.id);
            }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              style={{ color: "#DC3545", cursor: "pointer" }}
            />
          </button>
        </div>
      </li>
    </ul>
  );
};

export default Items;
