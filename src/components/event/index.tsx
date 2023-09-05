import {
  Checkbox,
  Container,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import EditButton from '../../common/buttons/EditButton';
import DeleteButton from '../../common/buttons/DeleteButton';

const Event = () => {
  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={1} />
              <TableCell>Event</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>

              <TableCell>Event Name</TableCell>

              <TableCell>
                <EditButton />
                <DeleteButton />
                <Switch defaultChecked />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default Event;
