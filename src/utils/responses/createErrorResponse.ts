import { TErrorResponse } from "../../types";
import { GeneralError } from "../../utils/errors/index";

function createErrorResponse(error: GeneralError): TErrorResponse {
  return {
    error: {
      message: error.getMessage(),
      statusCode: error.getStatusCode(),
      statusText: error.getStatusText(),
      code: error.getCode(),
      dateTime: error.getDateTime(),
    },
  };
}

export default createErrorResponse;
