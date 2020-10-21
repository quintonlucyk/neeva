import * as React from "react";
import {
  List as MaterialList,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

interface Props {
  children: JSX.Element;
  list: any[]; //Since this is a preliminary challenge, skipping interface def
}

const List: React.FC<Props> = ({ list, children: Icon }) => {
  return (
    <MaterialList>
      {list.map((item) => (
        <ListItem>
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </MaterialList>
  );
};

export default List;
