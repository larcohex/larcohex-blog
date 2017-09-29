const express = require ("express");
const path = require ("path");
const app = express();
const firebase = require ("firebase");
const fs = require ("fs");

function subjectName (subject) {
  switch (subject) {
    case "math":
      return "Математика";
    case "physics":
      return "Физика";
    case "chemistry":
      return "Химия";
    case "biology":
      return "Биология";
    case "cs":
      return "Информатика";
    default:
      return "u w0t m8?";
  }
}

let config = {
  apiKey: "AIzaSyAVsjYldatrx_T2J3gr53qqhmG6l8Bl8r0",
  authDomain: "github-page-6a1d7.firebaseapp.com",
  databaseURL: "https://github-page-6a1d7.firebaseio.com",
  storageBucket: "github-page-6a1d7.appspot.com",
  messagingSenderId: "578829824495"
};
firebase.initializeApp(config);

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect (
        ["https://", req.get ("Host"), req.url].join("")
      );
    }
    next();
  }
};

app.use (forceSSL());
app.use (express.static(__dirname + "/dist"));
app.set ("view engine", "jade");
app.listen (process.env.PORT || 8080);

app.get ("/robots.txt", function (req, res) {
  res.type ("text/plain");
  res.sendFile (path.join (__dirname + "/robots.txt"));
});

app.get ("/sitemap.xml", function (req, res) {
let sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://larcohex.herokuapp.com/</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad?subject=0</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad?subject=1</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad?subject=2</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad?subject=3</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad?subject=4</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad/math</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad/physics</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad/chemistry</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad/biology</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/olympiad/cs</loc>
    </url>
    <url>
      <loc>https://larcohex.herokuapp.com/blog</loc>
    </url>    
`;
  firebase.database().ref("/postrefs").once("value", function (snapshot) {
    const val = snapshot.val();
    for (let i = 0; i < Math.ceil (Object.keys (val).length / 3); ++i) {
      sitemap += `
        <url>
          <loc>https://larcohex.herokuapp.com/blog?page=` + i + `</loc>
        </url>
      `;
    }
    for (let post in val) {
      if (val.hasOwnProperty (post)) {
        sitemap += `
          <url>
            <loc>https://larcohex.herokuapp.com/blog/` + val[post].ref + `</loc>
          </url>
        `;
      }
    }
    sitemap += `
      </urlset>
    `;
    res.set ("Content-Disposition", "attachment");
    res.type ("text/xml");
    res.send (sitemap);
  });
});

app.get ("/olympiad/:subject", function (req, res) {
  if (["math", "physics", "chemistry", "biology", "cs"].indexOf (req.params.subject) > -1) {
    if (req.headers["user-agent"].startsWith ("facebookexternalhit/1.1") || req.headers["user-agent"] === "Facebot" || req.headers["user-agent"].startsWith ("Twitterbot") || req.headers["user-agent"].startsWith ("Googlebot")) {
      firebase.database().ref("/olympiad/" + req.params.subject).once("value", function (snapshot) {
        res.render("seo", {
          url: "https://larcohex.herokuapp.com/olympiad/" + req.params.subject,
          title: subjectName(req.params.subject),
          description: "Материал для подготовки к олимпиаде",
          img: snapshot.val().img
        });
      });
    }
    else {
      res.sendFile (path.join (__dirname + "/dist/index.html"));
    }
  }
  else {
    res.redirect ("/404");
  }
});

app.get ("/blog/:post", function (req, res) {
  firebase.database().ref ("/posts/" + req.params.post).once ("value", function (snapshot) {
    if (snapshot.val()) {
      if (req.headers["user-agent"].startsWith ("facebookexternalhit/1.1") || req.headers["user-agent"] === "Facebot" || req.headers["user-agent"].startsWith ("Twitterbot") || req.headers["user-agent"].startsWith ("Googlebot")) {
        firebase.database().ref("/postrefs/" + snapshot.val().id).once("value", function (sn) {
          res.render("seo", {
            url: "https://larcohex.herokuapp.com/blog/" + req.params.post,
            title: sn.val().title,
            description: sn.val().subtitle,
            img: sn.val().img
          });
        });
      }
      else {
        res.sendFile (path.join (__dirname + "/dist/index.html"));
      }
    }
    else {
      res.redirect ("/404");
    }
  });
});

app.get ("/404", function (req, res) {
  if (req.headers["user-agent"].startsWith ("facebookexternalhit/1.1") || req.headers["user-agent"] === "Facebot" || req.headers["user-agent"].startsWith ("Twitterbot") || req.headers["user-agent"].startsWith ("Googlebot")) {
    res.render("seo", {
      url: "https://larcohex.herokuapp.com/404",
      title: "Не найдено",
      description: "Запрошенная страница не найдена"
    });
  }
  else {
    res.sendFile (path.join (__dirname + "/dist/index.html"));
  }
});

app.get ("/*", function (req, res) {
  if (req.headers["user-agent"].startsWith ("facebookexternalhit/1.1") || req.headers["user-agent"] === "Facebot" || req.headers["user-agent"].startsWith ("Twitterbot") || req.headers["user-agent"].startsWith ("Googlebot")) {
    res.render("seo", {
      url: "https://larcohex.herokuapp.com/",
      title: "Larcohex",
      description: "Блог-портфолио"
    });
  }
  else {
    res.sendFile (path.join (__dirname + "/dist/index.html"));
  }
});
