import classes from "./Contact.module.css";
import { useState, useId } from "react";

export const Contact = () => {
  const id = useId();
  let alertMessage = "";

  const initialForm = { name: "", email: "", content: "" };
  const [form, setForm] = useState(initialForm);

  const [hasName, setHasName] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  const [hasContent, setHasContent] = useState(true);

  const [properLengthName, setProperLengthName] = useState(true);
  const [formattedEmail, setFormattedEmail] = useState(true);
  const [properLengthContent, setProperLengthContent] = useState(true);

  const [isDisable, setIsDisable] = useState(false);

  const validateNameForm = () => {
    if (!form.name) {
      setHasName(false);
    } else if (form.name.length > 30) {
      setProperLengthName(false);
      setHasName(true);
    } else {
      setHasName(true);
      setProperLengthName(true);
    }
  };

  const validateEmailForm = () => {
    if (!form.email) {
      setHasEmail(false);
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setFormattedEmail(false);
      setHasEmail(true);
    } else {
      setHasEmail(true);
      setFormattedEmail(true);
    }
  };

  const validateContentForm = () => {
    if (!form.content) {
      setHasContent(false);
    } else if (form.content.length > 500) {
      setProperLengthContent(false);
      setHasContent(true);
    } else {
      setHasContent(true);
      setProperLengthContent(true);
    }
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearAllInput = () => {
    setForm(initialForm);
  };

  const sendForm = async () => {
    setIsDisable(true);

    validateNameForm();
    validateEmailForm();
    validateContentForm();

    if (!form.name || !form.email || !form.content) {
      setIsDisable(false);
      return;
    }

    try {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            content: form.content,
          }),
        },
      );

      if(!res.ok) {
        switch(res.status){
          case 400:
            window.alert("エラーが発生しました。内容をもう一度確かめて、再送信してください。");
          case 500:
            window.alert("サーバーエラーが発生しました");
          default:
            window.alert("エラーが発生しました");
        }
        setIsDisable(false);
      }

      const data = await res.json();
      window.alert(`結果:${data.message}: ありがとうございます。返信をお待ちください。`);
      setIsDisable(false);
      clearAllInput();

    } catch (error) {
      window.alert("送信に失敗しました。下記に");
    } finally{
      setIsDisable(false);
    }    
  };

  return (
    <div className={classes.bodyPreset}>
      <label className={classes.contactTitle}>問い合わせフォーム</label>
      <div className={classes.formAlign}>
        <div className={classes.formPreset}>
          <span className={classes.formLabel}>お名前</span>
          <div className={classes.formArea}>
            <input
              type="text"
              id={`${id}-name`}
              name="name"
              value={form.name}
              onChange={handleForm}
              className={classes.nameForm}
              disabled={isDisable}
            />
            {!hasName ? (
              <span className={classes.error}>名前の記入は必須です</span>
            ) : !properLengthName ? (
              <span className={classes.error}>名前は30文字以内です</span>
            ) : null}
          </div>
        </div>
        <div className={classes.formPreset}>
          <span className={classes.formLabel}>メールアドレス</span>
          <div className={classes.formArea}>
            <input
              type="email"
              id={`${id}-email`}
              name="email"
              value={form.email}
              onChange={handleForm}
              className={classes.emailForm}
              disabled={isDisable}
            />
            {!hasEmail ? (
              <span className={classes.error}>
                メールアドレスの記入は必須です
              </span>
            ) : !formattedEmail ? (
              <span className={classes.error}>
                メールアドレスの形式が正しくありません
              </span>
            ) : null}
          </div>
        </div>
        <div className={classes.formPreset}>
          <span className={classes.formLabel}>本文</span>
          <div className={classes.formArea}>
            <textarea
              rows={15}
              id={`${id}-content`}
              name="content"
              value={form.content}
              onChange={handleForm}
              className={classes.contentForm}
              disabled={isDisable}
            ></textarea>
            {hasContent ? null : (
              <span className={classes.error}>本文の記入は必須です</span>
            )}
          </div>
        </div>
        <div className={classes.buttonAlign}>
          <button
            className={classes.sendButton}
            disabled={isDisable}
            onClick={sendForm}
          >
            {isDisable ? "送信中..." : "送信"}
          </button>
          <button
            className={classes.clearButton}
            disabled={isDisable}
            onClick={clearAllInput}
          >
            クリア
          </button>
        </div>
      </div>
    </div>
  );
};
