# events-API
API permettant de recenser des évenements et de mettre à disposition les informations les concernant.

Chaque évenement se présente sous la forme d'un document MongoDB du type:
{
  _id: ObjectID("<id de l'évenement>"),
  label: "Soirée Roller Téléthon",
  description: "L’association acsp brest organise sa traditionnelle soirée Roller Telethon\nLe vendredi 6 décembre prochain à partir de 20h, au complexe sportif de la Cavale Blanche.\n\nEntrée libre et prêt de patins pour ceux qui souhaitent participer au défi.\nUne buvette vous proposera crêpes, bonbons et boissons pour vous régaler.\nFaites passer le message autour de vous et venez nombreux.",
  type: ["sport", "caritatif"],
  organizer: <id de l'organisateur>,
  town: "Brest",
  address: "Complexe sportif de la Cavale Blanche 330 Avenue de la Libération 29200 Brest",
  date: ISODate("2019-12-06T20:00:00.000"),
  cost: 5,
  release: ISODate("2019-12-05T12:00:00.000")
}

Chaque document organizer se présente ainsi:
{
  _id: ObjectID("<id de l'organizer>"),
  name: "acsp-brest",
  town: "Brest",
  address: "12 Rue de Kerelie, 29200 Brest",
  description: "Le club ACSP BREST « A Chacun Ses Patins A Brest » vous propose diverses activités autour du roller ou du quad (patins à roulettes), vous pouvez y trouver une école à partir de 4 ans jusqu’à pas d’âge, etc...",
  website: "http://www.acsp-brest.fr/",
  mail: "mail@acsp-brest.fr",
  release: ISODate("2019-12-05T12:00:00.000")
}

Consommation de l'API:
Deux types de ressources: events ou organizers
GET /<ressource>                  -> renvoie tout les élements de la ressource
GET /<ressource>/<id_élement>     -> renvoie l'élement spécifié
POST /<ressource>                 -> crée un nouvel élement
PUT /<ressource>/<id_élement>     -> mets l'élement à jour
DELETE /<ressource>/<id_élement>  -> supprime l'élement
