import { Divider } from "@interchain-ui/react";
import { Layout, Wallet } from "@/components";
import HomePage from "@/components/app_index";
import mock from "@/data/db.json";

export default function Home({...props}) {
  return (<>
      <HomePage {...props} />
      </>
  );
}

export function getServerSideProps(ctx) {
    const props = {};

    props.users = {};
    mock.users.map((user) => {
      props.users[user.id] = user;
    });


    props.commitments = mock.commitments?.map((commitment) => {
        commitment.author = props.users[commitment.authorId] ?? null;
        return commitment;
    });

    props.claims = [];
    return {
      props,
    };
  }