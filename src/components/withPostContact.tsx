import postContact from "@/lib/api/postContact";

export default function withPostContact<P>(Component: React.ComponentType<P>) {
  return function ComponentWithPostContact(props: Omit<P, "postContact">) {
    return <Component {...(props as P)} postContact={postContact} />;
  };
}
