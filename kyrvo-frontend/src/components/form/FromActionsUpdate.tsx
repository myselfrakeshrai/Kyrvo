import { Button } from '@mui/material';
import { Close, Check, ArrowLeft } from '@mui/icons-material';
import { PAGE_ACTIONS } from 'src/constants/appConstants';

interface FormActionsUpdateProps {
  pageAction: string | undefined;
  submitText: string;
  isDirty: boolean;
  onCancel: () => void;
}

const FormActionsUpdate: React.FC<FormActionsUpdateProps> = ({
  pageAction = PAGE_ACTIONS.view,
  submitText,
  isDirty,
  onCancel,
}) => {
  return (
    <>
      {pageAction === PAGE_ACTIONS.edit && (
        <>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={!isDirty}
          >
            <Check />
            {submitText || 'Submit'}
          </Button>
        </>
      )}
      {pageAction === PAGE_ACTIONS.create && (
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={!isDirty}
        >
          <Check />
          {submitText || 'Create'}
        </Button>
      )}
      <Button
        variant="contained"
        sx={{ marginLeft: 3 }}
        onClick={onCancel}
        color="secondary"
      >
        {PAGE_ACTIONS.view ? <ArrowLeft /> : <Close />}
        {PAGE_ACTIONS.view ? 'Go Back' : 'Cancel'}
      </Button>
    </>
  );
};

export default FormActionsUpdate;
