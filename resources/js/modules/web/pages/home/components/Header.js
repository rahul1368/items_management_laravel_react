import React from "react"

export default function Header() {
  return <header className="bg-primary text-white">
    <div className="container text-center">
      <img width="125" height="125" src="http://graph.facebook.com/100004561268937/picture?type=square" alt="..." className="rounded-circle" />
      <h1>Rahul Kumar</h1>
      <p className="lead">B.Tech in Computer Science & Engineering from NIT Patna</p>
      <p className="lead">Fullstack Developer at&nbsp;
        <a className="text-white"
           href="http://www.etmoney.com"
           target="_blank"
           rel="noreferrer noopener">Etmoney Times Internet Limited</a>
      </p>
      <p className="lead"><i className="fa fa-heart text-danger" />{`{ PHP, Node.js, JavaScript, Java, MySQL, MongoDB }`}</p>
    </div>
  </header>
}

Header.displayName = 'HomePageHeader'
