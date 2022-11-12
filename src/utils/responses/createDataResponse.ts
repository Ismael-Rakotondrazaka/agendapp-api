import { TDataResponse } from "../../types";

function createDataResponse(data: Record<string, unknown>): TDataResponse {
  return {
    data: data,
  };
}

export default createDataResponse;
