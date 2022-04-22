/**
 * ResponseData is used to send a response when the request processing finishes
 *
 * Sample error response data:
 * {
 *   "errors": [
 *       "AlreadyExistsError: already exists"
 *   ],
 *   "data": null,
 *   "success": false
 * }
 */
export interface ResponseData {
  data: object | null;
  success: boolean;
  errors: any[];
}
