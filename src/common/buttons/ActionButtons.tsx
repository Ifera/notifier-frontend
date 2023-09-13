import { Switch } from '@mui/material';
import { MouseEvent, useState } from 'react';
import {
  Properties,
  UseDeleteHookResult,
  UseEditHookResult,
} from '../../interfaces';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

interface ActionButtonsProps {
  type: 'App' | 'Event' | 'Notification';
  data: Properties;
  editHook: UseEditHookResult;
  delHook: UseDeleteHookResult;

  // callback functions
  onClickEdit?: (data: Properties) => void;
  onClickDelete?: (data: Properties) => void;
  onClickSwitch?: (data: Properties, value: boolean) => void;
}

function ActionButtons({
  type,
  data,
  editHook,
  delHook,
  onClickEdit,
  onClickDelete,
  onClickSwitch,
}: ActionButtonsProps) {
  const [switchStatus, setSwitchStatus] = useState(false);
  const [delBtnStatus, setDelBtnStatus] = useState(false);

  const handleClickEdit = () => {
    if (onClickEdit) onClickEdit(data);
  };

  const handleClickDelete = () => {
    setDelBtnStatus(true);

    delHook.mutate(
      { id: data.id },
      {
        onSettled: () => {
          setDelBtnStatus(false);
        },
      }
    );

    if (onClickDelete) onClickDelete(data);
  };

  const handleClickSwitch = (value: boolean) => {
    setSwitchStatus(true);

    editHook.mutate(
      {
        id: data.id,
        is_active: value,
      },
      {
        onSettled: () => {
          setSwitchStatus(false);
        },
      }
    );

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
      <DeleteButton
        onClick={(e) => onClick(e, 'delete')}
        disabled={delBtnStatus}
      />
      <Switch
        key={data.id}
        onClick={(e) => onClick(e, 'switch')}
        checked={data.is_active}
        disabled={switchStatus}
      />
    </>
  );
}

export default ActionButtons;
