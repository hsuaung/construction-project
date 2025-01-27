import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export const Task = ({ id, image, name, email, team, staffType, status }) => {
  const { attributes, listeners, setNodeRef, transition, transform } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="data"
    >
      <div className="dragSortBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M12.5 11.25C13.1904 11.25 13.75 10.6904 13.75 10C13.75 9.30964 13.1904 8.75 12.5 8.75C11.8096 8.75 11.25 9.30964 11.25 10C11.25 10.6904 11.8096 11.25 12.5 11.25Z"
            fill="#F27D14"
          />
          <path
            d="M12.5 21.25C13.1904 21.25 13.75 20.6904 13.75 20C13.75 19.3096 13.1904 18.75 12.5 18.75C11.8096 18.75 11.25 19.3096 11.25 20C11.25 20.6904 11.8096 21.25 12.5 21.25Z"
            fill="#F27D14"
          />
          <path
            d="M17.5 11.25C18.1904 11.25 18.75 10.6904 18.75 10C18.75 9.30964 18.1904 8.75 17.5 8.75C16.8096 8.75 16.25 9.30964 16.25 10C16.25 10.6904 16.8096 11.25 17.5 11.25Z"
            fill="#F27D14"
          />
          <path
            d="M17.5 21.25C18.1904 21.25 18.75 20.6904 18.75 20C18.75 19.3096 18.1904 18.75 17.5 18.75C16.8096 18.75 16.25 19.3096 16.25 20C16.25 20.6904 16.8096 21.25 17.5 21.25Z"
            fill="#F27D14"
          />
          <path
            d="M17.5 16.25C18.1904 16.25 18.75 15.6904 18.75 15C18.75 14.3096 18.1904 13.75 17.5 13.75C16.8096 13.75 16.25 14.3096 16.25 15C16.25 15.6904 16.8096 16.25 17.5 16.25Z"
            fill="#F27D14"
          />
          <path
            d="M12.5 16.25C13.1904 16.25 13.75 15.6904 13.75 15C13.75 14.3096 13.1904 13.75 12.5 13.75C11.8096 13.75 11.25 14.3096 11.25 15C11.25 15.6904 11.8096 16.25 12.5 16.25Z"
            fill="#F27D14"
          />
        </svg>
      </div>
      <p>{image}</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{team}</p>
      <p>{staffType}</p>
      <p>{status}</p>
      <div className="detailBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="25"
          viewBox="0 0 21 25"
          fill="none"
        >
          <path
            d="M6.13377 14.6432C6.58598 14.6432 7.01967 14.4316 7.33943 14.0549C7.65919 13.6783 7.83883 13.1674 7.83883 12.6348C7.83883 12.1021 7.65919 11.5912 7.33943 11.2146C7.01967 10.8379 6.58598 10.6263 6.13377 10.6263C5.68156 10.6263 5.24787 10.8379 4.92811 11.2146C4.60835 11.5912 4.42871 12.1021 4.42871 12.6348C4.42871 13.1674 4.60835 13.6783 4.92811 14.0549C5.24787 14.4316 5.68156 14.6432 6.13377 14.6432ZM12.1015 12.6348C12.1015 13.1674 11.9218 13.6783 11.6021 14.0549C11.2823 14.4316 10.8486 14.6432 10.3964 14.6432C9.94421 14.6432 9.51052 14.4316 9.19076 14.0549C8.871 13.6783 8.69136 13.1674 8.69136 12.6348C8.69136 12.1021 8.871 11.5912 9.19076 11.2146C9.51052 10.8379 9.94421 10.6263 10.3964 10.6263C10.8486 10.6263 11.2823 10.8379 11.6021 11.2146C11.9218 11.5912 12.1015 12.1021 12.1015 12.6348ZM14.6591 14.6432C15.1113 14.6432 15.545 14.4316 15.8647 14.0549C16.1845 13.6783 16.3641 13.1674 16.3641 12.6348C16.3641 12.1021 16.1845 11.5912 15.8647 11.2146C15.545 10.8379 15.1113 10.6263 14.6591 10.6263C14.2069 10.6263 13.7732 10.8379 13.4534 11.2146C13.1336 11.5912 12.954 12.1021 12.954 12.6348C12.954 13.1674 13.1336 13.6783 13.4534 14.0549C13.7732 14.4316 14.2069 14.6432 14.6591 14.6432Z"
            fill="currentColor"
            fill-opacity="0.8"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.6267 12.6348C20.6267 19.2897 16.0461 24.6853 10.3964 24.6853C4.74666 24.6853 0.166016 19.2897 0.166016 12.6348C0.166016 5.97986 4.74666 0.584229 10.3964 0.584229C16.0461 0.584229 20.6267 5.97986 20.6267 12.6348ZM18.9217 12.6348C18.9217 18.181 15.1049 22.6769 10.3964 22.6769C5.68785 22.6769 1.87107 18.181 1.87107 12.6348C1.87107 7.08851 5.68785 2.59265 10.3964 2.59265C15.1049 2.59265 18.9217 7.08851 18.9217 12.6348Z"
            fill="currentColor"
            fill-opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};
