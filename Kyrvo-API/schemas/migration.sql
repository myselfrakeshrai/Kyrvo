CREATE TABLE IF NOT EXISTS VehicleLog ("Id" integer PRIMARY KEY,"VehicleId" integer,"VehicleLogTypeId" integer,"VehicleLogValue" text,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS Reservations ("Id" text,
"Email" text,
"FirstName" text,
"LastName" text,
"PickupDate" integer,"DropoffDate" integer,"PhoneNumber" text,"PickupLocation" text,"DropoffLocation" text,"Price" real,"Distance" real,"Hours" integer, "IsPaid" integer,"PaymentMethod" text,"AgencyId" text,"AgentId" text,"VehicleId" text,"ReservationType" text,"Remarks" text,"UserId" text,"UpdatedOn" integer,"CreatedOn" integer, "VehicleType" text, "RefId" text, "PickupTime" text, "DropoffTime" text, "Duration" text, "DistanceText" text,  "DurationSecs" integer, "Status" integer);
CREATE TABLE IF NOT EXISTS Notification ("Id" text PRIMARY KEY,"Type" text,"TypeId" text,"UserId" text,"Message" text,"IsProcessed" integer,"ProcessdBy" text,"Remarks" text,"UpdatedOn" integer,"CreatedOn" integer);

CREATE TABLE IF NOT EXISTS Agency ("Id" text PRIMARY KEY,"Name" text,"Location" text,"Address1" text,"Address2" text,"City" text,"State" text,"PostalCode" text,"Phone" text,"IsActive" integer,"Meta" text, "Email" text, "UpdatedOn" integer, "CreatedOn" integer);
CREATE TABLE IF NOT EXISTS Agent ("Id" text PRIMARY KEY,"AgencyId" text,"FirstName" text,"LastName" text,"Phone" text,"Email" text,"Address1" text,"Address2" text,"City" text,"State" text,"PostalCode" text,"AgencyRole" text,"IsActive" integer,"Remarks" text,"Meta" text, "UpdatedOn" integer, "CreatedOn" integer);
CREATE TABLE IF NOT EXISTS Features ("Id" text,"Name" text,"Desc" text,"CreatedOn" integer,UpdatedOn number);
CREATE TABLE IF NOT EXISTS Roles ("Id" text PRIMARY KEY,"Name" text,"Desc" text,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS vehicletypes ("Id" text,"Name" text,"Desc" text,"Image" blob,"Seats" integer,"Luggages" integer,"Price" integer,"MinMileage" integer,"MaxMileage" integer,"MileageUnit" text,"CreatedOn" integer,"UpdatedOn" integer, "BasePrice" real, "DiscountedPrice" real, "DiscountedDistance" real, "HourlyPrice" real);
CREATE TABLE IF NOT EXISTS Permissions ("Id" text PRIMARY KEY,"RoleId" text,"FeatureId" text,"PermissionLevel" integer,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS User ("Id" text PRIMARY KEY,"FirstName" text,"LastName" text,"PhoneNumber" text,"Email" text,"Pwd" text,"RoleId" text,"IsNew" integer,"IsVerified" text,"VerificationToken" text, CreatedOn number, UpdatedOn number);
CREATE TABLE IF NOT EXISTS Vehicle ("Id" text PRIMARY KEY,"Name" text,"Desc" text,"VehicleTypeId" text,"Image" text, "LocationId" text,"AgencyId" text,"AgentId" text,"Vin" text,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS Feedback ("Id" text PRIMARY KEY,"FeedbackImage" text,"FeedbackDesc" text,"FeedbackName" text,"FeedbackUsername" text,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [Media] ("Id" text PRIMARY KEY,"Name" text,"Type" integer,"Active" integer,"URL" integer,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [Logs] ("Id" text PRIMARY KEY,"DataId" text,"TableName" text,"Columns" text,"Data" text,"Remarks" text,"UserId" text, "ActionType" text, "Successful" integer, "CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [AppConfig] ("Id" text PRIMARY KEY,"VarName" text,"VarValue" text,"Description" text,"VarGroup" text,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [Variables] ("Id" text PRIMARY KEY,"Name" text,"Description" text,"Type" text,"Value" text, "VarGroup" text, "CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [Pricing] ("Id" text PRIMARY KEY,"Name" text,"Description" text,"Priority" integer,"StartDate" text,"StartTime" text,"EndDate" text,"EndTime" text,"IsActive" integer, "Multiplier" real, "Code" text, "CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [AppConfig] ("Id" text PRIMARY KEY,"VarName" text,"VarValue" text,"Description" text,"VarGroup" text,"CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [Blogpost] ("Id" TEXT PRIMARY KEY,"Title" TEXT NOT NULL,"Body" TEXT NOT NULL,"FeaturedImage" TEXT,"Images" TEXT,"Views" INTEGER,"AuthorId" TEXT,"Category" TEXT,"Tags" TEXT,"Published" INTEGER,"IsFeatured" INTEGER,"CreatedOn" INTEGER,"UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [BlogCategory] ("Id" text PRIMARY KEY,"Name" text, "CreatedOn" integer, "UpdatedOn" number);
CREATE TABLE IF NOT EXISTS [BlogTag] ("Id" text PRIMARY KEY,"Name" text, "CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [Events] ("Id" TEXT PRIMARY KEY,"EventTicketTypeId" TEXT NOT NULL,"Title" TEXT NOT NULL,"Body" TEXT NOT NULL,"FeaturedImage" TEXT,"Images" TEXT,"Venue" TEXT,"Views" INTEGER,"UserId" TEXT,"Category" TEXT,"Tags" TEXT,"OrganizerId" INTEGER,"OrganizerNumber" INTEGER,"OrganizerEmail" TEXT,"EventWebsite" TEXT,"Published" INTEGER,"IsFeatured" INTEGER,"ScheduledDate" TEXT,"ScheduledTime" TEXT,"EndDate" TEXT,"EndTime" TEXT,"CreatedOn" INTEGER,"UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [EventCategory] ("Id" text PRIMARY KEY,"Name" text, "Description" text, "DisplayOrder" integer, "Images" text, "CreatedOn" integer, "UpdatedOn" number);
CREATE TABLE IF NOT EXISTS [EventTag] ("Id" text PRIMARY KEY,"Name" text, "CreatedOn" integer,"UpdatedOn" integer);
CREATE TABLE IF NOT EXISTS [EventTicketType] ("Id" TEXT PRIMARY KEY,"Title" TEXT NOT NULL,"Description" TEXT,"Price" REAL NOT NULL,"IsActive" INTEGER NOT NULL,"MaxQuantity" INTEGER,"AllowMultiple" INTEGER NOT NULL,"CreatedOn" INTEGER,"UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [EventReceipt] ("Id" TEXT PRIMARY KEY,"EventId" TEXT NOT NULL,"EventTicketTypeId" TEXT NOT NULL,"UserId" TEXT NOT NULL,"IsPaid" INTEGER NOT NULL CHECK (IsPaid IN (0, 1)),"IsUsed" INTEGER NOT NULL CHECK (IsUsed IN (0, 1)),"Quantity" INTEGER NOT NULL,"TaxAmount" REAL,"TotalPrice" REAL NOT NULL,"Remarks" TEXT,"CreatedOn" INTEGER,"UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [MenuItem] ( "Id" text PRIMARY KEY, "Name" text ,"Description" text , "Price" REAL , "Category" text , "MealType" text , "PrepTime" INTEGER, "Active" INTEGER, "Images" text , "CreatedOn" INTEGER, "UpdatedOn" INTEGER );
CREATE TABLE IF NOT EXISTS [Orders] ("Id" text PRIMARY KEY, "OrderNumber" INTEGER, "Tax" REAL, "TotalPrice" REAL, "GrandTotal" REAL, "Tips" REAL, "DiscountCoupon" TEXT, "DiscountAmount" REAL, "PaymentMethod" TEXT, "PaymnetStatus" INTEGER, "CustomerId" TEXT, "Status" INTEGER, "EstDuration" INTEGER, "OrderMethod" TEXT, "OrderType" TEXT, "OrderDate" INTEGER, "TableId" INTEGER, "ServerId" TEXT, "Remarks" TEXT, "CreatedOn" INTEGER, "UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [OrderItem] ( "Id" text PRIMARY KEY, "OrderId" TEXT, "ItemId" TEXT, "Quantity" INTEGER, "CreatedOn" INTEGER, "UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [ContactUs] (  "Id" TEXT PRIMARY KEY,  "Name" TEXT,  "Email" TEXT, "Message" TEXT,       "CreatedOn" INTEGER,  "UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [NewsLetter] (  "Id" TEXT PRIMARY KEY,  "Email" TEXT, "Subscribed" INTEGER, "CreatedOn" INTEGER,  "UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [Collections] ("Id" TEXT PRIMARY KEY, "Name" TEXT, "Description" TEXT, "AddToMenu" integer, "JsonSchema" TEXT, "UiSchema" TEXT, "Data" TEXT, "CreatedOn" INTEGER, "UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [CollectionData] ("Id" TEXT PRIMARY KEY, "Data" TEXT, "CreatedOn" INTEGER, "UpdatedOn" INTEGER);
CREATE TABLE IF NOT EXISTS [PhotoAlbums] ("Id" TEXT PRIMARY KEY,"Name" TEXT NOT NULL,"Description" TEXT,"Type" INTEGER NOT NULL,"Images" TEXT NOT NULL,"CreatedOn" INTEGER,"UpdatedOn" INTEGER);
