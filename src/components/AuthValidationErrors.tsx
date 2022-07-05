/* eslint-disable react/jsx-no-useless-fragment */
const AuthValidationErrors = ({ errors = [], ...props }: any) => (
  <>
    {errors.length > 0 && (
      <div {...props}>
        <div className="font-medium text-red-600">
          Whoops! Something went wrong.
        </div>

        <ul className="mt-3 list-disc list-inside text-sm text-red-600">
          {errors.map((error: string, key: number) => (
            <li key={`error-message-${key}`}>{error}</li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default AuthValidationErrors;
