import { Switch } from '@mui/material';
import { MouseEvent } from 'react';
import {
  Properties,
  UseDeleteHookResult,
  UseEditHookResult,
} from '../../interfaces';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

interface ActionButtonsProps {
  data: Properties;
  editHook: UseEditHookResult;
  delHook: UseDeleteHookResult;

  // callback functions
  onClickEdit?: (data: Properties) => void;
  onClickDelete?: (data: Properties) => void;
  onClickSwitch?: (data: Properties, value: boolean) => void;
}

function ActionButtons({
  data,
  editHook,
  delHook,
  onClickEdit,
  onClickDelete,
  onClickSwitch,
}: ActionButtonsProps) {
  const handleClickEdit = () => {
    if (onClickEdit) onClickEdit(data);
  };

  const handleClickDelete = () => {
    delHook.mutate({ id: data.id });

    if (onClickDelete) onClickDelete(data);
  };

  const handleClickSwitch = (value: boolean) => {
    editHook.mutate({
      id: data.id,
      is_active: value,
    });

    if (onClickSwitch) onClickSwitch(data, value);
  };

  const onClick = (e: MouseEvent, type: 'edit' | 'delete' | 'switch') => {
    e.stopPropagation();

    if (type === 'switch') {
      const t = e.target as HTMLInputElement;

      handleClickSwitch(t.checked);

      return;
    }

    if (type === 'delete') {
      handleClickDelete();

      return;
    }

    if (type === 'edit') {
      handleClickEdit();

      return;
    }
  };

  return (
    <>
      <EditButton onClick={(e) => onClick(e, 'edit')} />
      <DeleteButton onClick={(e) => onClick(e, 'delete')} />
      <Switch onClick={(e) => onClick(e, 'switch')} checked={data.is_active} />
    </>
  );
}

export default ActionButtons;
