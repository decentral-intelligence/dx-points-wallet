import { useAppDispatch, useAppSelector } from "../../hooks";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { actions } from "../state";

type LoadingStateSetter = (isLoading: boolean) => void;

function setLoadingState(
  isLoadingCount: number,
  dispatch: ThunkDispatch<any, any, any>
) {
  return function (isLoading: boolean) {
    dispatch(actions.setLoading(isLoading));
  };
}

export function useAppLoadingState(): [boolean, LoadingStateSetter] {
  const isLoading = useAppSelector((s) => s.app.isLoading);
  const dispatch = useAppDispatch();
  return [isLoading > 0, setLoadingState(isLoading, dispatch)];
}
