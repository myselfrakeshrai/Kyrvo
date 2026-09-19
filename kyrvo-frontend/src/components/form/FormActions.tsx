import { Button } from '@mui/material';
import { Close, Check, Delete, ArrowLeft } from '@mui/icons-material';
import { PAGE_ACTIONS } from 'src/constants/appConstants';

interface FormActionsProps {
  pageAction: string | undefined;
  submitText: string;
  isDirty: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  pageAction = PAGE_ACTIONS.view,
  submitText,
  isDirty,
  onDelete,
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
          <Button
            variant="contained"
            color="error"
            sx={{ marginLeft: 3 }}
            onClick={onDelete}
          >
            <Delete />
            Delete
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

export default FormActions;
