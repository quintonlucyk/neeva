import * as React from "react";
import { Formik, Field, Form } from "formik";
import { Input, Button } from "@material-ui/core";
import {
  Search as SearchIcon,
  CalendarToday,
  ContactMail,
  FolderOpen,
  Message,
  Twitter,
} from "@material-ui/icons";

import List from "../components/List";
import calendarData from "../data/calendar.json";
import contactsData from "../data/contacts.json";
import dropboxData from "../data/dropbox.json";
import slackData from "../data/slack.json";
import tweetData from "../data/tweet.json";

interface Props {}

const Search: React.FC<Props> = () => {
  const [calItems, setCalItems] = React.useState<Array<string>>([]);
  const [contactItems, setContactItems] = React.useState<Array<string>>([]);
  const [dropboxItems, setDropboxItems] = React.useState<Array<string>>([]);
  const [slackItems, setSlackItems] = React.useState<Array<string>>([]);
  const [tweetItems, setTweetItems] = React.useState<Array<string>>([]);

  enum listTitlePossibilities {
    title = "title",
    name = "name",
    message = "message",
  }

  interface iterItem {
    dataWarehouse: Array<any>;
    listTitle: listTitlePossibilities;
    callback: React.Dispatch<React.SetStateAction<string[]>>;
  }

  const iterItems: Array<iterItem> = [
    {
      dataWarehouse: calendarData["calendar"],
      listTitle: listTitlePossibilities.title,
      callback: setCalItems,
    },
    {
      dataWarehouse: contactsData["contacts"],
      listTitle: listTitlePossibilities.name,
      callback: setContactItems,
    },
    {
      dataWarehouse: dropboxData["dropbox"],
      listTitle: listTitlePossibilities.title,
      callback: setDropboxItems,
    },
    {
      dataWarehouse: slackData["slack"],
      listTitle: listTitlePossibilities.message,
      callback: setSlackItems,
    },
    {
      dataWarehouse: tweetData["tweet"],
      listTitle: listTitlePossibilities.message,
      callback: setTweetItems,
    },
  ];

  const searchItems = React.useCallback(
    ({ search: searchText }) => {
      let tempItems: Array<string> = [];

      iterItems.forEach(({ dataWarehouse, listTitle, callback }) => {
        tempItems = [];
        dataWarehouse.forEach((val) => {
          let found = false;
          for (let i = 0; i < val.matching_terms.length; ++i) {
            if (val.matching_terms[i].includes(searchText)) {
              found = true;
              break;
            }
          }
          if (found) {
            tempItems.push(val[listTitle]);
          }
        });
        callback(tempItems);
      });
    },
    [iterItems]
  );

  return (
    <div>
      <Formik initialValues={{ search: "" }} onSubmit={searchItems}>
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            style={{ width: "18em", margin: "0 auto" }}
          >
            <Field placeholder="Search" name="search" type="input" as={Input} />
            <Button type="submit">
              <SearchIcon />
            </Button>
          </Form>
        )}
      </Formik>
      {[
        [calItems, <CalendarToday />],
        [contactItems, <ContactMail />],
        [dropboxItems, <FolderOpen />],
        [slackItems, <Message />],
        [tweetItems, <Twitter />],
      ].map((val) =>
        (val[0] as Array<string>).length !== 0 ? (
          <List list={val[0] as Array<string>}>{val[1] as JSX.Element}</List>
        ) : null
      )}
    </div>
  );
};

export default Search;
