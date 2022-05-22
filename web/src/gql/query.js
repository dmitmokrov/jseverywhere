import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn
  }
`;

export const IS_LOGGED_IN_LOCAL = gql`
  {
    isLoggedIn @client
  }
`;

export const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      hasNextPage
      cursor
      notes {
        id
        content
        createdAt
        favoriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

export const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        id
        username
        avatar
      }
    }
  }
`;

export const GET_MY_NOTES = gql`
  query me {
    me {
      id
      username
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

export const GET_MY_FAVORITES = gql`
  query me {
    me {
      id
      username
      favorites {
        id
        createdAt
        content
        favoriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      id
      favorites {
        id
      }
    }
  }
`;
