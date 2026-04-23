import MemberApplicationForm from "../../components/main/public/ApplicationForm.jsx";

// TODO(member-application): this page should own the public application entry
// point. Add a clear hero/intro, embed the form, show submit success state,
// and guard against duplicate submissions if the user already has an active
// application.

const AddMemberApplication = () => {
  return (
    <div>
      <MemberApplicationForm />
    </div>
  );
};

export default AddMemberApplication;
