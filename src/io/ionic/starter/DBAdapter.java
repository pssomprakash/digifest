package io.ionic.starter;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class DBAdapter
{

	static final String DATABASE_NAME = "DB01";

	static final int DATABASE_VERSION = 1;
static final String City = "TA0102";
  static final String Entity = "TA0103";
  static final String Type = "TA0104";
  static final String Lat = "TA0105";
  static final String Long = "TA0106";
  static final String Des = "TA0107";
  static final String Img = "TA0108";
  static final String rating = "TA0109";
  static final String others = "TA01010";
  static final String DATABASE_TABLE_TourApp = "TA01";
	static final String DATABASE_TABLE_CreateInformation = "create table TA01(TA0101,TA0102,TA0103,TA0104,TA0105,TA0106,TA0107,TA0108,TA0109,TA01010,TA01011);";
	//static final String DATABASE_CREATE_AppVersion = "create table EDU16(EDU16001);";
	final Context context;
	static DatabaseHelper DBHelper;
	SQLiteDatabase db;

	public DBAdapter(Context ctx)
	{

		this.context = ctx;
		//DBHelper = new DatabaseHelper(context);
	}

	public  void a(Context ctx)
	{

		DBHelper = new DatabaseHelper(context);
	}

	private static class DatabaseHelper extends SQLiteOpenHelper
	{
		DatabaseHelper(Context context)
		{
			super(context, DATABASE_NAME, null, DATABASE_VERSION);

		}

		@Override
		public void onCreate(SQLiteDatabase db)
		{
			try
			{


				db.execSQL(DATABASE_TABLE_CreateInformation);
			//db.execSQL(DATABASE_CREATE_AppVersion);

			}
			catch(SQLException e)
			{
				e.printStackTrace();

			}
		}

		@Override
		public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion)
		{
			Log.w("TAG", "Upgrading database from version" + oldVersion + "to" + newVersion + ", which will destroy all old data");
			db.execSQL("DROP TABLE IF EXISTS contacts");
			onCreate(db);
		}
	}

	private  synchronized static SQLiteDatabase open() throws SQLException {
		return DBHelper.getWritableDatabase();
	}
	//CLose the Database
	public void close()
	{
		DBHelper.close();
	}
	//---insert all keys----
			public  long insertTourData(String Id,String city, String Entity, String type, String Lat, String Long, String Des, String Img, String rating, String other,String review)
			{
				try
				{

					db=	open();

					ContentValues values = new ContentValues();
          values.put("TA0101", Id);
					values.put("TA0102", city);
          values.put("TA0103", Entity);
          values.put("TA0104", type);
          values.put("TA0105", Lat);
          values.put("TA0106", Long);
          values.put("TA0107", Des);
          values.put("TA0108", Img);
          values.put("TA0109", rating);
          values.put("TA01010", other);
          values.put("TA01011", review);



					long id = db.insert(DATABASE_TABLE_TourApp, null, values);
				 	return  id;
				}
				catch(Exception ex)
				{
ex.printStackTrace();
					return 1;
				}
			}


		//Get List of all Subjects along with its id respect to module selected
		public static String searchPlace(String city,String Entity, String Type){
			try
			{
				String selectQuery = "select * from TA01 where TA0102 like '%"+ city + "%' OR TA0103 like '%"+ city + "%' OR TA0104 like '%"+ city + "%'";
				//String selectQuery = "select * from EDU02;";
				final SQLiteDatabase db = open();
		        Cursor cursor = db.rawQuery(selectQuery, null);
		        String data="";
		        if (cursor.moveToFirst()) {
		            do {
		            	data+=cursor.getString(0)+"~"+cursor.getString(1)+"~"+cursor.getString(2)+"~"+cursor.getString(3)+"~"+cursor.getString(4)+"~"+cursor.getString(5)+"~"+cursor.getString(6)+"~"+cursor.getString(7)+"~"+cursor.getString(8)+"~"+cursor.getString(9)+"`";

		            } while (cursor.moveToNext());
		        } cursor.close();
		        data = data.substring(0, data.length()-1);
		        return  data;
			}
			catch(Exception e)
			{

				return "-1";
			}
	    }


	public static String countRow(){
		try
		{
			String selectQuery = "select count(*) from TA01;";

			final SQLiteDatabase db = open();
			Cursor cursor = db.rawQuery(selectQuery, null);
			String data="";
			if (cursor.moveToFirst()) {
				do {
					data+=cursor.getString(0);

				} while (cursor.moveToNext());
			} cursor.close();

			//data = data.substring(0, data.length()-1);
			return  data;
		}
		catch(Exception ex)
		{
			return "-1";
		}
	}

}
