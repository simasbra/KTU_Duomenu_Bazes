using Weather_Forecasts.Models;

namespace Weather_Forecasts.Repositories;

public class WeatherStationRepository
{
    public List<WeatherStation> GetTable()
    {
        var query = "SELECT * FROM `Weather_Stations` ORDER BY Code ASC";
        var drc = Sql.Query(query);

        var result = Sql.MapAll<WeatherStation>(drc, (dre, e) =>
        {
            e.Code = dre.From<string>("Code");
            e.ManagingOrganization = dre.From<string>("Managing_organization");
            e.Latitude = dre.From<decimal>("Latitude");
            e.Longitude = dre.From<decimal>("Longitude");
            e.Elevation = dre.From<int>("Elevation");
            e.Type = dre.From<string>("Type");
            e.fk_CityName = dre.From<string>("fk_CityName");
            e.fk_CityCountry = dre.From<string>("fk_CityCountry");
        });

        return result;
    }

   //  public static List<AutomobilisL> ListAutomobilis()
   //  {
   //      var query =
   //          $@"SELECT
			// 	a.id,
			// 	a.valstybinis_nr,
			// 	b.name AS busena,
			// 	m.pavadinimas AS modelis,
			// 	mm.pavadinimas AS marke
			// FROM
			// 	{Config.TblPrefix}automobiliai a
			// 	LEFT JOIN `{Config.TblPrefix}auto_busenos` b ON b.id = a.busena
			// 	LEFT JOIN `{Config.TblPrefix}modeliai` m ON m.id = a.fk_modelis
			// 	LEFT JOIN `{Config.TblPrefix}markes` mm ON mm.id = m.fk_marke
			// ORDER BY a.id ASC";
   //
   //      var drc = Sql.Query(query);
   //
   //      var result =
   //          Sql.MapAll<AutomobilisL>(drc, (dre, t) =>
   //          {
   //              t.Id = dre.From<int>("id");
   //              t.ValstybinisNr = dre.From<string>("valstybinis_nr");
   //              t.Busena = dre.From<string>("busena");
   //              t.Modelis = dre.From<string>("modelis");
   //              t.Marke = dre.From<string>("marke");
   //          });
   //
   //      return result;
   //  }
}