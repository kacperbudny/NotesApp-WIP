import React from "react";
import styles from "./Notes.module.scss";
import { useNotesContext } from "@contexts/NotesContext";
import PropTypes from "prop-types";
import homePageDisplayModes from "@utils/constants/homePageDisplayModes";
import { useLayoutContext } from "@contexts/LayoutContext";
import NotesGroup from "@components/notes/NotesGroup";
import { useParams } from "react-router-dom";

const filterNotes = (displayAs, tag) => {
  return (note) => {
    switch (displayAs) {
      case homePageDisplayModes.home:
        return !note.archived;
      case homePageDisplayModes.archive:
        return note.archived;
      case homePageDisplayModes.tags:
        return note.tags.includes(tag);
      case homePageDisplayModes.search:
        return true;
      default:
        return true;
    }
  };
};

const Notes = ({ displayAs }) => {
  const { tag } = useParams();

  const { notes } = useNotesContext();
  const { masonryRefs } = useLayoutContext();

  const filteredNotes = notes.filter(filterNotes(displayAs, tag));

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const archivedNotes = filteredNotes.filter((note) => note.archived);
  const otherNotes = filteredNotes.filter(
    (note) => !note.pinned && !note.archived
  );

  const displayOtherLabel = pinnedNotes.length > 0 || archivedNotes.length > 0;
  const displayArchivedLabel = displayAs !== homePageDisplayModes.archive;

  return (
    <div className={styles.notesContainer}>
      {filteredNotes.length > 0 ? (
        <>
          {pinnedNotes.length > 0 && (
            <NotesGroup
              label="Pinned"
              notes={pinnedNotes}
              masonryRef={masonryRefs.pinned}
            />
          )}
          {otherNotes.length > 0 && (
            <NotesGroup
              label="Other"
              notes={otherNotes}
              displayLabel={displayOtherLabel}
              masonryRef={masonryRefs.other}
            />
          )}
          {archivedNotes.length > 0 && (
            <NotesGroup
              label="Archived"
              notes={archivedNotes}
              displayLabel={displayArchivedLabel}
              masonryRef={masonryRefs.archived}
            />
          )}
        </>
      ) : (
        <p className={styles.noNotes}>
          There are no notes. Maybe it's time to add some?
        </p>
      )}
    </div>
  );
};

Notes.propTypes = {
  displayAs: PropTypes.oneOf(Object.values(homePageDisplayModes)).isRequired,
};

export default Notes;
