-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: presupuestos_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_company_name` (`company_id`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `legal_name` varchar(160) DEFAULT NULL,
  `tax_id` varchar(40) DEFAULT NULL,
  `email` varchar(160) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `logo` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Demo Company','Demo Company S.A.','30-12345678-9','demo@company.com','+54 341 0000000','Rosario, Santa Fe',1,'2025-12-13 13:42:30',_binary '‰PNG\r\n\Z\n\0\0\0\rIHDR\0\0£\0\0\0]\0\0\0z	)\0\0\0sRGB\0®\Î\é\0\0\0gAMA\0\0±üa\0\0\0	pHYs\0\0\Ã\0\0\Ã\Ço¨d\0\0‘ IDATx^\ìu|Ç¹÷¿K‡\Åd[2Û±\ã€;\ä0SC\r6MJ·M)iSf¼·p\ËLih\Zff™%Ù²²,‹ñ\èğòû\Ç\ìÉ²\ã$Nœ·\×?\Ö:g\Ï\î\ì\ì\Ì<8\Ï<#.p\0p\0p\0ûò\Øp\0p\0p\0\ï6£8€8€\Ø\ïş/»\édYF–e$IÂ´,¤\Â\ßE–qG®‹\"Ë„\Âa´@\0Y–Q•H$‚,+(Š€\ë:˜¦‰aØ–…e™X–…iš\är¹|™>\\wtóKRa-F\Ãu¡ğgq\ë˜ûG}w—3û\Zÿg‡\ÏÀ>‚O£\î˜\Ï{ƒw‚¾÷ö\Ùûÿñ\ÂH’$dYFUUğ˜¿iš\0„Ba\ÇF’$rºNQQU\Õ5”UTR3a\"¥¥\åTO¨¥²²’š‰•”–•\nGÀ•‘dY\é\rZÏ±Mô\\Ç±I§\Óôõ\Ñ\Û\ÓK|høğ ;è§¯·‡ÁÁl\Ë\Ê\ß+\Ë2®\ë\âº\î¸BjŒ\ËCòºTü¿\ë}û»©\ÄÀ\ì\Æ>c\Ï²\éñ~\Û\×\Ø?4ı/Œ(H’$!I–e1a\â$¦Ïœ\Éô™3™6c‡vÅ¥e\ÂR4LÓ¦¸¨YV¼û@’]dI\ße_@øVÎˆµ\ãC$L\ÓD–e$GÁql\Û\Æ4MU&—\Íb\Ù6\éT’mÛ¶Ğ²m­-\Û\èØ¹ƒ¶¶8¶…®\ëy+JQTU\Åõ„«eš8\ÎH7J\Ò\îÕ¾Ç»ö 8€ÿ@\n“\İ	˜ñÎwn_aÿ\Ğôÿ	a¤(\n³š\Ãô™³8üˆ#Xp\ÔQLœTK*“FU\0j@\Ë3y	]\×\ÑuÓ°0ƒt&C&&›\Ë`m\ãºB Ø\í\Øya!IŠ,£Ê¢l-D\Ó4\"\á\Ñp„h$F(FU‚Á0#¬\ÇqDÙkĞ²2\é4\Í7°u\ëf\ê×­aË–fR\É–e\å­%M\Ó<a\ç`\æ®\Ê\Ó;Šw\å!p\0ÿG0ñúlú€0úÿªªRRZ\Æ!‡\ÆI\'ŸÊœy‡P[7W®¯`0˜wÛ©šL6›%•L&3d(\'™H\Îdpl\Ûqò\ÂF\Ì)H²ø>v\ŞG@XJFN\'\ä\ç‰dY&¡i\Zš¤¢¼š\â¢2ŠŠŠ©¬¬ ´´Œp8Œ$Iy÷\\*•\Â4M\0©TŠm\ÍÍ¬Z¹ŒµkV±©i²,\áxõó-?<¡»ZI…–\ÓÛ·¢\Ş\Ö\Íp\0°[òN\nœ=aÿ\ĞôŒ0R…òŠJN8ñdYtó8’h,€¬*È²Œ¦i\0d³ºzz\è\ë\íf` Ÿ¡¡!‰x‰+ªD ¤°\ë@°mÛ¶q-V\Ğ\ØF”$\×;\n$	›\Èu][Â¶%,\ÓÅ¶\Å\ÜU8¦¤¤„	&PUUEee5¥eeD£Qr¹œpñ™–e¡*\Z\í¬X¶„\×^y‘µ«WaYb>lt]¤QÂ‡q\Ô[\Ç>+\è\0\àÿ0ö†µŒv\åMûoTw{\Ó\ïi„BaN9\í\Î8ól;r±X\Ûu°mƒH$‚¢\ÈX\Íp\"Nkk+­­­\Íd1-“h$$¬IBQIÆ±-‰\ÉD‚ş¾~ôl\Äğ0\ÙL–L&ƒ\ËaY†nxA®..b^Ê·J‚¡ @€`0H($	S\\\\Lie\áH˜ŠŠ\Z\0’,,!!˜r¹¶\å\"\Ë2•\ÕULšTG]]k&RRR‚,\ËØ–K:ö\ê Ñ¹s\'/¿ø<\Ï=ı8\í;\Û0\n,$<!´\×\Ö\Ğ^7¼\à\0\à\0v‹±f\ìùñÎ½\Ó\Ø?4½W\ìæ½ˆIµu¼ÿ²\Ë9û\Ü÷Q^Y\Ó\rG#(Š‚etvv\ĞÚ¶®®.º»;…5¡ªy7›¦ª€\Ãp|˜ş\Ş>º;:\ì$>8D*™‚½¯\à*I’PUÛ¶))+¥´¬”ªšj\Ê*+¨XC0D’%@Æ´,L\Ã\Â\"‘\'Nd\æŒYLœ8‘ªª\ZFnŠr!\Ì\Z\Öò\Ôcò\ÂsO£\ëú(\Ä\Ş\n¥½\ZoxÁ{\ãüÀşÀ\î„R!\Æ^óN	§\İ=ÿ\Å^±›w…ó\Z>¿9\',\Ûvò\Õ<şÄ“¹ğı—±`ÁQ¼¹Ë¶(**\"\Ò\Û\ÛË¶m\Ûhm\İ\Æ\à\Ğ –e ¨Ò¨Işt*\Í\Î\Ö\ìÜ±ƒ\Ş>q\ætüp\êw…\Â		ŠbE˜¶EeU%U•L>Iuµ\0Ø–‹¢(¤\Ó\\b±\"¦LÆ¬Y³¨«›B \ÈG\éI’„‘\Ë\Çy\ä{x\èş{‰Ç‡ò‚\Øw8…\ï\êúÿ‰úŒ|ÿÏƒ$yAğù÷\ß\ï\äğ‡±J\Ğ\îğn\Ñ\Û{c®ğó»…ı\Óûú¤‚ù\ÙsUù\ÌÒ¶\íüugsı¯O0gŞ¡8C&“\×%‹†Ø¼y3›š7\Ò\Ù), X,Š$¹¸\ØX–E2‘`G\Ëv¶om¡§³“\\6—¾?\0`†_I–‘¼H¹p4\Ê\Ô\éS™4u\nS§NÇ²mE\ÌY–„BQQŒÙ³\ç2c\Æªªªp]\á\ÂS½Å¹f.\Ç\Ã\Ş\Ïm·şƒ¾\ŞndYÁu…0ò\ìZ¶\í1\æ±D°ÿ\Ú\ã\Å.hÿÁïºŸ°7\Âhl‹Kù.û\Ë2üv\Z+|\Æ~Ÿ^÷%öO»\ïg\êiDIWQ,\ËBQD\ĞÁ¼C\ç‹_ù\Zr\ã`\Z(2\å\åå˜¦É²\åKX¿~=™L†`0@q¬\Ã0p]›\í[·±uóf¶omÁ\Ğu(È¼\à\ä…Ğ¨¦Ë¨\Ş]\ä­C@ö¤ªi3÷yL6ªª	¨ªŠiZ˜¶E.k (\Zt,`Ò¤Id\Ó9\Ñf’D@QI$†y\ì‘¸ı_ÿd ¿IV£¿˜]„ò~\"\ï<\Ë\ÏG¡i¾Ÿúü?¾r5öü8¯Õ…`\Z\ï—ÿD\ÒÚ¨Á¹—\ç\Æ`?\íû©½\ßœF–\ÅBP\ß2\Ò4	kù\ì\çndÁ\Ñ\ÇRVV†mSZ^ÀÒ¥KY¶l1©tšššj/dZ\Åö¬ æ¦4®]O2!\Ö\ä\à…|û®Ç¶q<\Ë`÷x£I•w²,ƒ$\á:N^8H’„\ä	\Ò³f1k\Î\\\æ<YUp]0\r›Db\×u©›T\Ç\ÙgŸM]]™LT*CH (\n==<ú\ÈıüõO¿\Ï[¢@\Şu—C®ÿ\í?²·:oFû\ãYFş\Ø\Úò=0z şÇ¡¤¤„\á\áağ\ÚjDğ\î-kŞµ%\Çiò7…ı%ü÷ö\ß1H^v\ßJ	|\ê37òk®!\na\Û6Y=G4\Z%°v\íj–,]J_E\ÅED#TMA–$r\Ù4«W¬¤~\Í:ôœp\Ãù\Ïğ\áº\î8ı·Ë‰ì§\Ù(Š\â5“&r\ä\ÑG3û ƒEf2™\ÉdSOsø\áGp\Æ\é\çRS]K6›E’d‚Á\0€J{G\ßü\ÚWXµr%™t\Z<&mûÁÿÁ\Â\È\Ç(&ğ.$Y¹ŠÃ‘³f\ÎfıúµV±®°\àÆ\Ğı\Å0\Ş,v\'Œ|93rf¼\ë\É\Ãÿ?\Şù­@Q”<\Í\å™ònioü6*\Änšq¯°¿\Æ\Ö~F¾ \Ò4G\ËOÿ÷\×\ÄJKp‘ùÀvlª««\Ù\Ñ\ÖÆ“O=Î\Ö\Ö|xt(\ä-&u]V,^\Ì\ÚU«ó¹\İ$Y5xG¡7\ÑSû©c\Ş|.¯¬\à\è\ã\ç 9ó°-‹¬A“]úûû)-©fÂ„ZBÁˆ·\àV#\Ò(.…yğ¾û¸\ãö\ÛP\ŞaTN/IŞ¢]\ï7I’Àóš9\ë1ei™\n­8\Çõ+\\Œ,‹€”‚û<Æ¼O4e=K~Pƒ\×Š¢‚ª¢\à‚\È|Q(ò•õò\Ûx¯PğxEU\Éf2\\t\Éeœvú™|\íËŸ\Ç4-±\ÙuF-P‘W–E„¥^´ŸH‰[0\âó\ã|TŒœ —Ë¡©\ê(7\í¾‚\ßös\ç\Æ\ÜCgò\ÔiLª\ÌAs\æ¢i\ZƒCCÄ‡†h\Û\ÙJ\Ç\Î\ìh\ÙÆ–M\é\ï\íu¿\Ñu»‹~û(Š‚m;\"‰\ÑóÀ’$\Ğ4l\ÇA‘e‰\Ä\Øbö	ü©\0‘~\ZYş!\êkš\æ¸mŸ‡»}\ß=ó0Ut%\ËJ\Ş\ã\äø4\áñCŸüEó¶-²\ÈüŸFş€ûò7¾Ë¥—_ªª\èf×µ	…B„B\Z\Ï<û,K—,AQb±®+ˆC\ZÖ®g\Ù\ëK0\rcT‡kª†aŠu6£7¦÷øòû©S\ŞüöS5Ë´p]—º)S8j\Ñ\"&O­#5œÀq¢\Ñ\"EÁĞ­üÛ\în¶mm¦£½#—C÷\Ò½›–\Ñ\Õ\×ü§ó>J\ËJ°,\×qˆ\Æb¤\Ó)\Â\áH>=R0 \á¸.]=]üò\Ç?¤½µ¥€ DıŠKË¸ñ\ßa\Î\Üy(\Ûr\\G¬\än¸‰~¿ò\n·\ßz³ˆÌ´D=€,É€K\Í\ÄI\Üøõ\ïPVQIEe¦a\Éd…Ã¸\Ò[Û…ErA\ÂÁ\Èf‘](+)\á‰\Ç\æÖ›ÿJÎ³\ê\Ç2\ãH$\Â\ÅW^\Å\égKiy†i\á\0\îX[\0‘\Èw¤\"iHa«¸lÚ¸‘m[6\ÑÔ°5+—\ï“q_V^Á\ég¿ó.û\0•&‹•‘%‰@08Šá¹®\ë¥\ß\Ò\é\é\é`ıª<÷\ØC¬[±\ns^şS?_©=\í¬³¹\äò+™0a²ª`˜6Z ˆiš¸®M,¦­­\çzœ\Ç¸l1o…\Ê\Ñ+•$‰3\Ï9‡Ë¯¾–h¬„H8Š\ã\n¾d[š¦\n„Ø¹³\ßúZ·m¥½½=\ï\èweıeÙ»ö}\áp8ı\ìó¸ğıWRYQAqI†\×Î¶mP‰Ş¾^}òQ¹ÿ>\ØMû¾ûfû{_\ì\Ì\Ùsø\É\Ï~\Ë\ì9s1\İ\ĞQ5…²²ººÚ¹\ïşû\é\í\í!‹!IBº«ªJwg;+/ehpÇ¶ó\Ì7¤\äÿ7º{-ŒöS‡¼UøŒ\Ë\'JEQ˜=wG{±XŒH$B&“¡»³‹ö¶6¶m\İ\Æ\àÀ\0xsi¾e\à—õN\È\ÂòU\å\Ğ#\áı8—_~9Ã‰¡PˆD:…\ëºƒAL#GMU57ı\í¯\Üs\Û-l\ß\Ü8RgO\ÓS…P8L0V\Â5Ÿ¼«?ğ´`˜\\6+©ˆl\Zã ¨2%\ÅE<ıØ£\Üs\ë-¬Zº8¿…ˆ\ë2H^]\×ebmg_rüğG¨©®a(\'£h\ê(f¿·ğ³½™H@£mûvnı\ç_y\ì¡{\Î÷£Mšªi,Xt\"—_}-\\x	‰L\nw\Ôó÷\\—|–y\ï\ÇÁu,2™’ä²¹i·şõO¬[±\İ0Ş\Â\á0\ÙlYQp‡P(Ä©gÏ‡>ö\Ê\'\Ô«¨@VE¬\ï\Ã{¦m\Û8C8A\×uLC\'\Z+Bò¢@Y»\ä5nú\ÍO\é\ê\Ø9J076ó\í%I|\è\á¼\ï’\Ëø\ì\rŸ#H,¦¢\Ñ(wÿû6º\ç.Ö¬Xö†\ïö\Æğ…Q!«?v8^zıø\'\É\é\Â²,“Ú‰µ\Üò÷›x\ì\á{Y·r	;z£ÿı\ä\Ï\\1š‡¿^’‡y\ç]t)\×}ú\Ó$\âIO€–•ñÀ=wrÿ\İw°fÅ²¼\"Z8\î\ŞM\ìy\ä¾\ë¤ğ³8ü\à\ÓN8ùTn¿ûA\ê¦N%«\ç\ĞMMS¨¨(\ã•W_â¦¿\ßD6›!\rc\êY,S\Çu,V¼ş:/<ñ4ƒıb\Ë\×uq½d£yø\Ã\ï8wDX?Œ>ş?ƒÿ>¾©mYMxô‡\ØÚ¼™¥¯½\Î-û;>ø«V¬dhp0o¡ ò\Ë\Ú{H{uf\"A$\âœmYH®ÁÌ™\Ó0L\Ëu0\0-R„+&©\ë1L>\æX=t\ç~ñpA_Ú¶MyI1gŸ}..2¦e–—¢hLW-„\á8du-À±“P=w!ŒVD|\Â\ì\é\ì`\ŞÁ³QU\rÛ•ˆ• h*¬`)\ã²º\ÛÃ‘UlEV ˆî¥Š’T)?™=¶\ÇA’eá†¶¦\ÔNA–e$)\0ª†#\É8¨ ˆúIj\0I\r‚5Œ«„p•\Z\Â\Ñ8ª†«¨ÈŠ†QRZN(\á\àC\à\ë?ú_®ø\ØubQøx®\Î†\ÈB\"K2\ÑX1\ßøÁ\Ïøô_gÒ´)”WV\Ô¸+4rCnUIIBQUa©[.ªny\ÛAS5***8õ\ìóùóq\ê\Ù\àº.\áp\n\æ\Ù\n‘o/\×%—I3ş|a\åº.®™L†’’\"†öÈŠ‘ò$\ï{2>Ä¼\ÃC’e,\×AQƒA\Ò\Ù•\Å\Äºqw#ˆF>û\Ç\Şc„ÿ\n\Z‰÷w3ş¡¦‰)ƒ%\ËXšŠ\î:DbaCƒùúw\ï&v\íÕ·	ÿedoñ(O‡\ãK]Y–¹\êšó‹\ßü	\Ó~\Çq5\"\Ñ0÷\Şw7/¾ø¡PU´ƒAø\àO=ü(\Ö\×c˜\Æ7œ\ë\r’7¸\ì?\Ãñ8\Ï=ıK^_,R\íG¿°Çƒò\Ä\âCˆ\É\é\\\×9=C:$R\\„+)\rRS3‘\ãO=Cˆ1{<9ƒ\Ëqò\çxLZ\É/\æ\Z\ê\Ç\Ğ-\\l$l{$œ_‘E»¶\Ç\è6r\\—\êŠr1®%7/·\\$gœ\Ã9d\ĞIBñ2Y–Q™œi`8’*G¾K}<Q.IÅŠ(.*\"•Hc™&¦ac\èfN\Ç\Ò\rd$\\\ËÆµ,\ËÆ±M\\\Ç\Ê—Ş¶\Å\Z<\ÃAB®¤ŠÆ˜8©K>øa.¹úC\àE·¡¹»¨ªJ0\â\×¾…cO8•ªšjÁ¦aË¤À±\Ğ‰h$D@“1ô¶¥c[:±X€²²(š\"\Ú\'ç¹‹eY&SQU\Ã¾ı?œwñUBiP\Õq\Ûf\ì¹h4J<Ï¿§8Ld	¼.\ß7póÿ\åÿú\ãR–eb±\ÉTÇ±°¼ö\ÎdRC*ª*\Ö÷\áÕ¿ğ¤ñEü2ú\Û(Á3\ê§¸Dcia%\Z¶…iY\ät‘\ÄYQF\ÄÀ\Øv|7±Ï…‘’\ßñÔ¥¢¢\0]\×I§\Ó(ŠBQQ\×\áK|\á\Ë_Ã•FJqq\Ë6¹ù–°e\Ëf\Ê\Ë\Ë\Ñ4…l6K(fKóV~ôqúú…fäµ™H™ó6\àŒ¥x\Ç\à\îÁ\àtl\Û[/eb9.AMeÛ†zşø‹£\'\âz–\\.G6›aş‘™6c’$\Â\ŞTU0\Ë\â\Ò2N?\ç|š†®g	5ZZ7ò·›ş@2\Çu]S0hS7\Æ0€Ñ„82®„\ßEr!›õòfs˜º“\Ë\á\är¸º†l¨…\ê˜(¶l\é`dÁ\È\â\äÒ˜\é\é¡~†z:\éÙ¹ƒxOñşR\éª&2É‡Âºé†\ã8d\ÒiŒœm˜\â½l\Ç\Êaeä’ƒd¸F\n\×\È`\çRùC2\r¸d	M‘Pd0rB¨éºaXE‹ù\È\'o`öœƒwë¶‘ı%’\ÄOõ7¦LŸEQQ\Û6±l\İH£\È¡ \Ì@_\'O>ş\0·ü\ãOüó\ï\ä\Ïüû\ë¯ùı\ï~\Ì]wü¦kq\Ì4AUEvÁ1ml\Û!‹\Åø\Ä\r_\ä\Ìó.\Æñ‚öˆ‚\ì\"¦ib˜bDôùˆ°x§\á8.\"Ï¤?\'¦\ë:™lF(…{…˜\r\ï÷İ\ß=}\á)xNA’e¡\Äxn\Ø=\İø.B~0ö\äÛ¦i8Ãœ9sY»n=\×}\ê“z\Ø\áTTV¡\ëşøu\\q\å‘\áó4JJŠ\é\ë\ë\á\æ[şA*•¤¸¸\Ë2\ĞuAtMõ\r¬^¶L¸t\Æ\Îg¼7\Úñ?\Z’$‰DÀcŠ¾‹Mc¯\Ş3ü\ë=@\í¤ZN9\ãl´P˜t&G( eS#[š›È™‡z8 \È\nccY&kV,EQ\Ä<Š?.ıÀµ,<vª¦\â¸6ª*ó\àƒ÷O2\ç\àyE‹°l\Ç0\îv\êW¯¢½­m”%/*:ò\Ñÿ|\ÙeW-.G\Ö8¶…cÛ„•\ç~’†u«IĞ²e#[šhß±-Ít´µ²ms3Û·m¢mûV¶l\ŞÀšU\ËY»jõõkY»f\r«V,g°·\É5Yµ|\ÅøÚ©\äTÀ´i\ÓYtâ©„\ÂQt\ÓI&\Ò\İ\Ó\Åc\İO\Ãú5l¨_Í–æ¬_³’††ulÜ°\r\ëilX\Ë\Æ\rõli\ŞHK\ëŒ\\–ò\ÊrZ\Ó\Ğq1\É°u`@\ãõW^[ğ¢\r\Ç\áSŸÿ*>†Ò²RL\ÃÄ•@\Ïe\ÑT…X,È‹/=\ÇO<Jıš\Ô/_Fı²%4¯[\Ã\æúõ\ìØ¼™î´l\ßNk[+\åe\ÔL˜@2™\Â\Ğu2™4¡`€€¦p\ÄQGñú\Ë/’Ú­€(-+\ç\Ü.BV„\Âb\Ù¶\ã\àX&½İ,_ü:\Ş|\é\Û\Ãøƒ\ß\çQ%%%¼\ï\â÷F@R°]\ÇvÀµ\é\ë\éd\Ù\ë¯1X\à.…ñ‹.€¸ \Ğ2\Êÿ2\ê³DIq1gE\Å%\Ø\"½š\í€c\Ó\ß\İÁ²\×_c ¿üq÷.BÚ—\ì<“\Ëå¨®®\á¶;\î\â\ÔSOÀô¤²\ã8´\ì\Ø®Œ\åˆ\í¿\Ë\Ê\Ê\èho\ã\î{\ï\ÂuEp‚$¹\är9rz†õ+W³e\ã&oR\Şñ÷’\é±ıÜˆÿi\ÆÃœp\â‰,<r^t1S¦L\á‚\Îg\İÚ‘u0~Ÿ\×ü\Ò8{&\'¸\\\×\å¨c\å{?ı%Ñ²\n²†MUE9‹_x‚Æ†u\ä\\—k?ü1d)ˆ*©¸¶MooŸºö\nr\Ù,¶-Mğ§\Û\î¦n\ÊTTU&‹±¾a-\Ï=÷$\áP„3Î¾™3B7l3KHS\ØÔ¸\Ûoú+K^}ô\Ø\Z¯şÀ¿ïº—²\Ú¨¡(Š\ëRƒl\Ü\ØÀ\ÓO<Àw\ßE$\Z5^\Øö¨x!\áÁ@pTÔiš,8ö;ş~÷³_	†5’\Æ\0\'Ÿz\Z_úúˆ— ©l„‡ “N²rÉ«üõ\×ÿK|hˆ@@„0H’,˜³\ç>Š\Äb””—1s\Ş8\êX\Î>\ë\"l[\ÔEò²ud3)V-]\Â÷¿~\ãnÕ¡óğƒı’\â²R‚Á\0º7ÿ¨i*%%E\Ü{\ï¿il\\GıŠU´mÛ¾‹Ğ—Ç¶Ñ‚\æw439Œ3\Î8…c``\Ë\Ê\Ğ4$\ÇÆ±m¿ü\"?ş\î\×À›¯\Z\Óf\Ì\äWú3e\å• «\Ø. \ËÈÍ¦†µü\î\çÿ\Ë\æ\ææ±·½øzt\Ûø\Ó“\'O\á·¿™Xi\È’\ä\ÍÁ9›7¬\ç·?ı	[·l%Œm\ßñ‹#D5¢\'Iµuuü\æ/ÿ ¤ªW’‘d‘ ¨\ÉljX\Ã\ï~öS6o<vbŸº\ér¹’,óó_şò²\ndlo\È&Š¢Í¥\É\å2^\Ä\\·\ßñ/p8Œ,\Ãğğ0\É\ä0k–.gó†&±¶BQFiÁo\ÜI°·\Ğ4±\Ëí‚…ù\ì\ç>\Ç\íw\ŞÅ†M\Í\Üú¯\Ûù\Ú×¿Á‘GI6›å·¿ı=‡*r¾­¡\'tÆe„H`z®Û¶Ar\Ğu\Îöôt\î ~\İJ\ÊJŠ½9›ª\ê\ZN8\å4l\Û\ÛJQ8÷¢K©¨¬\Âu\Ä	–\É\ê\åK\é\ïè ¿·=—Ã±ll\ÓÀ4tL#®3j¦ƒ\Z=¼D\åeE\Âqm,\ËÀ6„{\Ì2\rI& i„C!2\é´P¤r:\éTšl&C6“\Ío?’Mgˆ‰¬ği\ïĞ³YV¾¾˜\×^ze|A4’$¡ª2\Ùl†l.M25L6“\Â2tÊŠŠÈ¤Ó˜¦)\ê‘G6“!L‘N¦HÄ‡\énï ¹¾‘Wx†ukÖ²¡¡ ªa\ætd[¸3S\Ã	úˆD¢c«\0^»_ó‘ˆLù\Ùl\Ó40H8\ÌO>Æ¦õ¼üøS´oß‘·¦UUE\ÕT/IlB¹ò\å\×Ù¸r9\Ï=÷õk±À±\È\å\Ò8¶…¥\ëvø\Ì;t>–5’·r,dIBrÁ2u\ËÀµE9¶cŠ\r1\ÇŸo»\ë>$YB’\\á¶´,LKÇ´Œ<\í\ì\éŞ·w77	°SŒ}=‡c\æÀŸ¥ñn\ØOØ§\Â\Èu]®ÿü™<m\ZºiH¦I{\Äi¹ºe¢(\n–c‰†\è\è\å®{\î$\á}½\İôöö\"\É.ƒ½}´l\ŞJ4\ZÍ‡ƒb‚Wõ˜\çn[ÿ\0òVƒF4\Z%‰Œfª\ÊÉ§\Ê7¿û]–®Z\Åó¯¼Â~úS\Î<\çlB‘0\ã\ÎeIe3\Ä\ÃÈš\Êşğ\'ªªªò\n†¿òºB!“§‹\n	\Ñu]aiH ¹FN\Ç0túúzØ¹µ…õkW“I%ql“œÁ4\r\Î:ÿ¢|t•iY\\z\å5‘¥]rÙ¸¡N¶6n\Ç\Å\ÑMpml\ËÀ±LlCa\Î\Ù\Ş\àºÂ\åx“\â\éT\nI‘\È\é\ÂúÏ»ô]a	‰^Ù®K¬¨˜\ënø\"®§AûıaY«–®û¸q\áz\ërdY\Â\Ğs¨X†¥gp“hTl*	#eU\ÓP5\r-@\Ï\æ8vÁñTWV‘Â¶tr™\"L{Ò¤	h1G\ã[\Ä>&O\Î\ÜyóPT™T*I&›Â¶M‚A›\ZØ²©‰¥/¾J6“®+\Ä\\eYb~\ĞS&\\gd\îx\Ã\êõô´µ²j\åb\Ù&—M`\\L× ¨(\Ìy\\ˆ\ãˆ0di‰\àz®d¡Ü˜˜–mXzió4o\î^\ÆF9ƒm›\"ˆ\Â21MÇ±Ä¼\ç»p,\Ù11³)°tl#5>\î\ì\ÓÖ˜¿\à(Î¿ğú™6m*±hˆÒ’Ao‘›¦i„\"aa)\n·ÿû_´w\ìdppMS8|ş|®¸\âR>ü\áó\Í\ï~‡\ß\İôÎ½\èBfÏ™^ €eš»šµ0.\\W¸C\Ó\é4º®\n‡9\æ¸\ã¸\á‹_\äñgá¦›o\æ3\×_Ï´\é\Óq½p\Ã00M\ÑgªªŠ5\'\Şz—¿\İôğ˜©)ÿß1ş 28Fl=D\ÂASUÚ¶µ2\Ğ\×\Ë\ê•K	TU\Â\Ğu¦NŸAEU\rª¦qÜ‰\'-‘K§Ñ³iYbùò¥ôt´\Ó\İ\ÑA(ÀuLd\ÇB\ÊG–9H®p§ù(¬V\á«ø“\ë8H¶d›\à˜8¶3múL>s\ãWø\ä\r_\â³7~•O^ÿE>y\Ãù\ä\r_\âÓŸÿ*\×\İğ%>ş™ù\æ~J4VŒ\æ)RÁ¨ÿı ®q\ÈeÓ¸–‰\ì8„T±1¤mZx‚Ù›¬¶\ÄB\çüaYù\ã\Ğù8\ì\Ãi\Z¹LErQd=—¦¯·“\Ş\î\î¼\Ò\á3~¿\ßŸÁ Qep][X f–m[6Ñµ³•¾üûÉ’ÈˆPh:\îè¼‹¶mÓ´v=Ãƒıtu´\"¹c‘K§p,\Ã\Ì1y\êdB\á0Š¿k‹	mÀò”\Ç‚\È\Ğ\ÅN\É\ï\\\ÇE–$°L$\ÛKX\ì®iä·¬y7\à\ØE\Æ6t,#^\ÎË·¶°Ï„‘ªi|\ëûÿMqi	±h”§}†×—­ £§…p8L0¨Q;i\ÈpË­7“É¤¸\æWñ\å/~ı\èG\\ıõœzú™\Ì=ø¦NŸÁ‰§œÊ·ø\ß\Üÿ\ä“<öüó|\ìSŸ¦n\êT(Xÿq\0»\Âg\Z>c\ÓYt<_ù\æ·yê…—ùõÿ\Ì]÷)\æ\Ì;”\â\Òrd\ÛB·L$\ÉEUe4M!P	†\'\ãH’D0$0¡¶/õk„B¡\Ñ\Ï-üü¦Æ·°ŒlK\Ç5RÈ¶c\Z¨j€\\6G\çvÖ­]E.;ŒK \Ë±˜Ê±\'cÛœz\Æé¨²…$EÃ´´lchp€­›š\Ğ4Í³,2©A,=…\Í\à\è8\î\Â|\Çş !K Y9\ÌL=“ —M`šúz\Úq\\“š‰\ÕL›1…Š\êr&MDİ´:&O¯£v\êD&O«¥nZ-®d0<Ü›·\ì‚mR\Ä<\Ò^*Y’˜\Ç6\Ñ3I=™\Ë8ù\ÔÓ˜w\èa\Ì?r!G.<šC\çÁ¡‡Áü™¿`!\Ç\"W|ğZ¾ü­oó\ïdj\0]O\"ab\Ziô\\’€ñ¡>:;\ÛH¦\Ìñö8h\îd\ÉÅµ-t#‡\ëXH\Øz®\ílÙ´1O§\ã\ì61ñXÅ²·³›¶VZ·m%\Z\àš¦\çRuI“L\Ä)..7€7ö=›\Å\Òu,]Ba7ux«;J\n!Iª\ãbgu\ìt\'—\ÃL§1\Ó/\ÆÛƒ¯Ä½1\\l\ÃÀ1M\Ï;\àX8»ww¾\Ûx\Û\Ñt’—3\ëÚ}‚\Ó\Î<ÁÁ~^{ıV®XÆšµ«y\á…yõ\ÕWY¼t	\ë\ë\ëQ†††X¸ğH>şñ3\ï\ày\ÔT\×\à\âÇ±=i­ª*@ˆp(‚\ã¸TU\×p\Ìq‹¸\ìªr\äQG\ã¸.İp@0\í>†\\{-_û\Öwø¯\ë>\É\ÑÇŠ\è±XMZ¸\ßÖŠ*‹6\×TB¡A-H(¢ Ÿşş~[,*õs~Íš=‹\æ\æM´n\ßN4\Zab~Œ%š\Âïµµµœz\Úi˜–‰•\Ë¨´´´\Ğ\ß\×Ç¶\Í[°L“)3§\n¨­\È\Ğ\Ğ\0eL¬Èš\Õkø\Æw¾\ëÚ˜¦N \ä\ÕW_¥mû6š\Z\Z…\Ã:>“\'\×Q^\\ŒcYØ–`n\Éd’†õ\ëi7š® ‚’ø\ïÊ«®DSU\\\Ûl\\\ÉÁq-&O©cö\ì™\ÔL¨¢¼¼”	«™0¡š‰µ˜8©Šš	•TU—3aBZ@¦£½U\Ëv5·;F\ÓMŸÆ¢E\'`9–`*¶…\ã:ö³võ\Z>x\íµœrúœrúYœp\êiœv\æÙœqö¹œz\ÆYœ|Æ™sü\"f<‡ª\Ê*LS\'	cÛ–\Ø\ßÊ³DU¢¾¡õk\Ö\Ò\Ş&\æ{ğ\è\İ\Ç\Ù\ç\Ï\ÄIµ\ärY1\'g\Ù2\ï£aM=\é”H¾[x\ß\îPxÍŒÙ³™;o.E±b,\Ë\ÄulL\Ë  *´¶¶²uóf\ÆmÃ²²r.¸ğl\×\Æ\ÅÁud/\Ü;J±|\é2úû\Ç\Şö0¾0ò\Ñt¥\\t\áÅ¸¶\ã¸\È.bN\ÓqÈ¤S,_¶t÷Q}\ã”[ÿ#ı2ö÷‘ëŠ‹Š9\ïüóD”£!¬C\Ë\Ğq›T*\Åòe¢=\Æk\Ëwo\Û2r]—\â\Ò2>ı¹\Ï\Ó\×\ß\Ï#>Dw\ïN&O›HeuÑ¢ñ\Ä0ƒƒƒ\Ã!v\î\ÜÁw\ÜÎ£<\Ê\ïÿ[yøaÖ®[‹®\ëTTTPQVAyi\áp\ÉK ©ª*–\ë ©\n\Ñ\â\"N:\ã~ò›\ßñ\Ä+¯óõş‡¹`”%ğ’$‰Fyÿ•Wq÷#r\Ómÿ\âcŸüs9„hQŒ@(ˆ¬\Ê(š\"Ü¥\ÑE%1JKŠ(‹D³t\Årn½\ã_|\ç‡\ß\ã\ë_ÿ:>ğ\0%eÅ¨\r\És¥„B¾ñ­\ï+*B\×sy\âÀObÁT€ƒm\è˜\Æ\ÈoÄ›Š\Ñ\İ\Ñ\ÉÖ­[I%“H@bx˜c9†Ÿÿ\æ7D#p,‹¶\Û\é\ïë¡©¡\ÙKœZ^RŠ‘\Íaš&¶·Î¨0\0coad·°,\Û01²9\Ò\Ã	RñaÒ‰$F6G6•&J‘I¦H&“¤R)Ò©”°‚#§À[“÷– 9¸–¸\"Ñ¥i8ù\ä“0ƒœ#IŠ5Z\Ù4©t‚T:A&\î*\ËF’! ª˜FNX¦¦XJ‹\ÅØ¸q#\Ã\Ã\Ãlİ´)OW>«r½\r0Á\0ºC\×s¸¶\í¨’Ì´ºi\è9=oE9®ï“\n\Æ\èRH¿e%%L¨ªF\×u²\Ù,®kc\èYLS§¼¼”pDŒñ\á¹U-\á¢s-Ó›³Ù%õ\Î@¼·¸\Ø6±\ßm:~\à›Áx‚h\ì\ßB(Š\"\æ½\Ã\ÜM‚\Öı‰·-Œ\0¾øµ¯\Ó\Ş\ŞÆ¿şuHÁ \Æ\à`œx<Aee]x	Ÿúôg¸êª«Ø±ChY½}\İlÜ¸‘ûî»\ßş\æ7|\ë[\ß\âúS\îº\ën\Z#©,/§¬¬Œ¢¢¢üÜ…,\Ëhšˆ¼«®©\áıW\\\É?ï¾—GŸ}K®¸’\â\Ò\Ò<‘Ë£2\çşgBQ$\æ\Î;„O\îó\Ü~\ß|\ã»\ß\ã\È)**\"\n!I’˜r\Ä\âÒ²²2*\ÊJ)*Š’L&Y¼l)7\İ|_ø\Êùú×¿ÎŸşô\'^xş\Ú\Û\Û)++cG[\ëÖ­#b\Ûb¾\Î4M\Ê\ËË¹î“ŸÆ²,\0\ì†\Ş~fj\Ë«\Ôı3ÁP(¿nmkS3ñxœ‘§°««‹ÁÁA.\\H{{;\ÙlEUiÙ¶®úº½\Ì\Ï@YYY^€°³¼T1{E–öVô\ÎÃ¸®ˆ£u\\7j\ì;\Çuó²,\Ú\Ö\Äò–;¼˜–a\æòeB¡P>s½\È.!\æO¤‚C–ñ\İ\È\å\çEP„\ÌÆY¿~=+—.#1ß•V\Ğ^¶mc;\"S†\ã8º¯‡eY\'1ô‚\È1\ïÿ‘\á1¾@\Â\ËWXZZNiY\ÙlUU\É\år¢M‡hT(ªoÛ¶óLw0_\Çs\å£\éLSDb¾Eh,ò\Ê\ßn0ö\ÅÛ´\Ô·¶—\râ½„·Í©k\'O&Õ¸ÿşSSS¢(d³&S§\Ä\å—k¯ù0‡r\áPˆW_~…5k\ÖPQQA(¢¬¬ŒIu©P…¢Jttvò\Üs\Ïğ\ë_ÿ’oû›üò×¿\æ¹çŸ¥¯¿—ªŠrªªªˆFEø·+9¸’HŒ¨ª*&O\á‹_ÿ¿\íN>ş\é˜<ednI\Z“\ï?	Çx¿øıù\Ù\ï~\ÏU\×~ˆ™³f‹\ÅpI\ë=JKK˜8q••\å(ŠÄ–-\Í\Üu\Ï\İü\à‡\ß\ã«_û2»\é/¬Zµ\nÛ¶©¬¬dÂ„	TUWQ\\\\ŠL(\Z\á\ÕWET”¢© —‡$I¼ÿ²Ë™2e*¹\\U-\È 0–\Zö>\è^š’€&&\áC¡]\í¤\â\Ãt¶w`\ätd$º;»\È\årôôô\é\í\íe(§³mçˆ°\0JŠ‹QU\Õ=61c·kTvÛ±)++\Ãõ„aˆEÙ†a°u\ëV¶n\İÊ¦M›¨¯¯gÓ¦M466\Ò\Ô\ÔÄ¦¦\Íl\Ú\ØÌ†Y³v-­m;ƒHŞ¸}«\\°a\é™F\Ë6°›@HCS$4UF\ÕdUh\è®+R\â˜FCÏ¢\ç2¸\Şb®\ë\âº\Ğ\Ğ\Ğ@cc#\Û6oac}ı.¯PÁk\Ú\ØH\ç\Î6TLa›ÈŠ¿VI¡¨¤$\í\ŞĞŸÿ,\×q(.)Á0,²\Ù4©T×²±tˆ\Ó\Ò\ÒB&“{û.x§…\Ñ^\ÈCğ\êa9LSŒc\ÔÃ·ŒÆ’™´›ı@eY%ˆüã½„·=g$\Ë«V¬$5<L[k\írÍµ\åø\ãO&)\î\×B\ÓTx\â1/\å\ÉHtÈ²\Øğ-+\"‹aZƒƒ¬^½Š•+W±r\Õ*zûz	…‚TUUQVZ‚¬(X¶‰\ã¸X¦	3u\ÚtN:õT\Ê\Ë+e‰®Î|\ç\Éc\çŞ£\Û6…šPiY9\'~\Z¹î“œqö9L>\Ò\ÒRb±²,{¹\0Lœ8\âh”\Şş^Ö¬Y\ÍO<Á½÷\Ş\Ë3\Ï>Å¶–­Ø¶M4\Z%‹yy\0\Õü\çş@õŸ™J&	…BÌ˜1Sµ+˜N$!ó\ê\Ë/\íÚ¶\Ä:–p¿\×\Ö\Õq\Êi§’\Édò\Úu.—c` Ÿu«×Œ\Õ\'PRRB$\"¶—H$’ô÷£i\Z\Í\Í\Íôtu±\ä•WF4hY\æü/D–Åœ˜\í¹\è\\oa\ï\çŒ\àò+®@V2™;²e}*•¢a}=O?ñ$›75\ÓX\ß@c}=\Z\Ù\Ğ\ĞHı\Úu4®¯gC}#\í\íL™:…\Õ\ËV¾9f0j\Îh:‹?\ŞÛ‹\Çs*8P_¿T2AWW\'\Ã\Ãqzzº`` Û¶ˆx!û¾À\Ïd2²c\Ç65o¢³£ƒe¯/¦©¾\Ã4\Çel>\Â\Ñ(¥¥¥TWWa\Û¶-A+ŠÂŒ3\è\ï\ëc\ã†\rù¶\İCQ\à1L¿>ı¹€l6ƒ¦i¸ƒe[$“I:;;Y±tY>#ûX”••qş\Íf1¼\ÔIŸ)Ü¶Y¶t\é>™3Úu\æ\Ójii^x™L\ÆkK\ŞU\Ì½9#|\á\ë}c•{s·’$Q\\\\Ì…_L\Ú[†§¤ûõù™3J%St·w²a]#M\ë™;û¦O›K|(E:Y\"‰°n\İ:úúú…b?\Éñÿ®…Ãˆ/^,Ó‘eˆDB\Ô\ÕM\"k’^xñ9~÷û\ßğ“Ÿü˜¿ÿól\Ü\ĞH4\Z¡ªº‚òªrB\á ®ki„£N=óL>ñ©\Ïğ­\ï~Ÿ\ã?UUGYJ…Z\Ş{\r>£óˆ$IT\Õ\Ôp\áe—s\ã7¾\ÉE—]Á”©Ó¨¨®$‹‰\Ä\"Lª›Ä„IppyúÙ§ù\É/~\Æ\Ï~ñ¿\Üú¯[XW¿I‰µ¨PE$F\Ó\Ä<?0-\Ç\ÆÁERddUA’\\À!Zemızr6-«j@\Î<\ëL¦N›>\Â\\}¢\ØË±\í³)ŸP}+\Ëwê¸\"±móR\É$\İ\İİ˜¦I*•bhh\0- ’Í¦\Ñ\ÔØ˜w?d2p]B¡Š¢ {®$qy¥\è\ÍÀ§ş!2T#;w´\ÑÜ´‰Í›6±mó¶ljfK\Ó&Z¶le[óZ·¶°f\éJú9œ·\é¢\Ãsõù\ï©T‚¶¶VV,_\Æ\Ú5«xıµWY±|\ëÖ¬¦¹i#\Í\ÍM\är\"­®góŸ_y\å%Ö­]\ËS>\Î}ÿ¾‹Ö­-Âº]:\Ñÿ&Iı=½\È2d2)o\Ù\èz]\Ï\"\Ë2\'Ÿr\Ê.ôµ<–\ãO:™Iµµ¤3L\Ó&›\Íb\Û6CŞ†|ñ¡¡±·\íÛ³´\×Ë¦ñnÀu	,\×Á²ŒQ\Ç[{…(„B\è¼ñ{9#,h\ÛÀ´t,\Û@\ÆÙ«>y7ğ¶9q¡vDy\ßÅ—‘H$dE+\ÅeE¢¹¹‰h,Œi\éA\È2\ìh\ÙN{«u\Ë4q\'Ÿ\Òß²,$\É%\nPZZLii)\éL’+–ñ§?ÿ‘Ÿı\ìg\Üwß½´µ\í ¬¬”‰“&PRZJIq1Å¥%\Âa\ê&O\å\Ò+>À_ş\Z§Ÿy€·C\ìÿ‘x’$1¡¶–÷_}57~ó›œx\Úé””–RZRByEÌ˜1ƒ\Ú\ÚZTUeÉ’%üş÷¿\çû\ßÿ.w\ß}7;(//§¸¸U~÷BB5M“œ—\04>4Ä–M\Í$\ÉQ‚\Ğu]R©[·n%\Z\rcYªª¢\ë:‘H„+?ğ!¤ŞŠp÷¨\È\×`ı9#\n\Ü;²,c\Û6M\r$“\ÉäŸ¯(\n\İ\İ\İX–Å¦\r\0±Ó¯¢ˆ\Ì\İQo±¯\íY]\î˜{_›ô\ë9ö»\ëM\ì+\Şn¬’¿(³ °$Ë´m\Û>¦\äHÒ®‹8w\×{¦/˜\Ë\Ê\Ê8÷œsy\í\åWy\ê\Ñ\'yş©gyöñ§y\ä\Ş¹÷ö»\èc{\ë6<a\Ûb\ËO<™K/»Œ¡¾~‘o®ÀŠñ\ÇÀx\è\Ü\ÙNN\Ï044”ŸK´m!8ºº:˜;o\'œt2xï¥Œ\í\Óq\×Á—¿ş\r\Ã`pp\Ó\ã¾5‘N§\Ù\Ù\Ö&vr\Şü1[\ØWûš\Ö\İ1Baw5FöºÒˆ\èö\ÇD\áQ€¼‚0\ê\ìüö\Û…¼û½€=÷\è^\"\àeFXtÒ‰h	Y±PdU‘(ŠE\é\í\îagG;ª§…;…¬©\ä²Y\ìüi\î½\í¼\ãn¿ô\n-\Í\Í$\âCXF\Û6@rPeÇ±PU™Ò’\"*+*H§,Yü\Zşóùı\ïË«¯¾L6—¡¼ª‚‰\'RQ9\â\ÒJ\"±b*jj8÷}òõ\ï|ó\Şw!Z €T\àÛŸPUU	ùÁ3m\æL>ô‰\ë¸\á+_ãˆ…G£*\Z%%%L›6i3¦1c\Æ4***hjj\âö\Ûo\ãg?û)w\ß}\'›7o\"‹QYY\Úr±\Å\á[[„c¹´¶lg\Å\â¥<÷\ÄS\Üû\Ü{\ë¿y\é©g©_µ\n²\Ïd7oŞŒm\Û(ŠĞ„M\Åv\Î8\ë‚Á #4-I¢`\'7A0»gk€k“Í¤p\\I\Ê\Éw%I¢©¡Ë´\è\í\íU7È¥3¤†lX·\ËBRö¢şp]TMC–!›\Ë`9t#‡i\ÚH’hó7 \"‚+n\ZdrY\Ã\È3^\Çq•‘ıº,\Ï7/{c\Ê[²,ƒÇ°}«\\.XxT‡\á\ä÷¬ğú\Âq²^6hY–‘QP$•t*5\ê6\Í\ÛrÁu]V.YÁ\Ğ\Ğ}ı}X¶A6›E7\rb\ÅEr\è|\êó7\â8\"S6¾ ò\İ\Ã~}\n¬uË²¨_\Û@\ÂÛ¶İ²#‡,C<™`p8\Î~òS›¶\ìö«<^\ày\ìüúO¢²¦’-[¶ˆı›l“l6\Ğ\è\è%™IÒ°¾\Ş\Ëÿ·{H’‹iê¸®D.g\Ë˜¦+Kh^°M8AõwøJ…,\Ë¼-p\n\ë»;‘\à’„,‹TWş<£\á	WW‚`(4ª\Ì@ €\æÿ\Õ4qü\Ï\Şğƒ¹\n÷\àòŸ\'•Æ¸œ%t]\'—\Ë	:\Ğu,\×Aör\îo¼\î$oõøQ\Ç\ãY\Ë2\Éå„¹¾eK³˜@E0\×v\Ğ\\\è\í\èÆ¶,LC\ì€840Hó†&^|úy\îø\çm\Ü}Ë¿yù\éØ¸¾‘¡Al\ÇD“ŠJ@QQU1?RVVFeEƒCƒ<ó\Ì3üı\ï\ã®;ÿÍ¶\íÛ˜0¡šš‰¨¬.§¸´IU(.*\æœó\ß\ÇO~öKÎ»\à\Âa´Ÿ„’?\àm/’¬z\ÂD¾ô\Íoó\ïÿù\Âö¶X˜PS\ÃôiÓ˜6m*Š¢°j\Õ*~û\Û\ßró\Í7\Ó\ĞĞ€$I\Äb\"\ã…$	¦¡z«ú%I\Â4v´´²z\É\n»ÿ!nû\Ë\ßy\áñ§X¿r5;v’I¥óZSwg\'9Bğ²,\n…Ø±cñxEQ0=?¸\ã8””–pÄ‚#ó„8j†`œ&-ü\İ\'2Ë‹vs¼|†>#Ö±`ô¹\\†õ\ëI§\Ód2\Âe800@2™¤É³Š\\r·€™Z\Ézı:»®‹$ŒSQ®—X.˜\×ğ\ë•N§\Éd³(Š2*0¢ğ™¾f\ïz\Â\È?ïŸ›1k6Ÿ¹şs€ƒVdy¤:c\å’#ú\Õ)H­\ã\Ç<#ô\ÚX\×õ|Ûµnk¥m{ñx\Ücfb\Şoxx˜µk\×rÉ¥Wr\ä\ÂcDI_ˆ\n\"F\\O 9\Ã\ÚUk\è\é\é¡\×Ë´`\Ù.6\à°eK3ı½üùÿ\ä£\×}’p$BÎ‹(t¼±\é\×}ú¬Y\Üù\àCu\ì1¬\\¹’t\Æ\ÛfÁ\ë\Ël6M?\ëW¯exHDø\í>\r^‰_WË²\Ğu“\în4MIô\Ñ\î\Â~ò™»_NEe%?øÑò{f\Çôœ\Ë\åv\éw€/\â\Ó¶7§\åÿõq¿{uš8©–Ÿıò7ùgÁşø\Âk\Û\â\â=Äp~\Çı\r\éÖ½\ìe¾\é¶1©¶Y–q,EQE‚\Ü}÷\İõi(8†IHVxö™hnŞ’o ŸiJ\Şú¢B\ÂB’(-+¥f\Ò¦LŸ\Æ\Ä\ÚIhÁÇ¸üX8ğ,Ë¡¬¤”\é\Óg2s\æLdY¦»»‡ş\Ş>ğ˜KEE9\ÙL†ûï¾‹{v„ş=K\àû\Zš¦\å\'KJË¸\êC\â¸NÄ²m\Ò\é4†a‹Å˜4ie\å\å²~\İ:¶·¶bš:EEEH\Ş\ÂcE‘pl;ß†–\ç¾Ù¾u\İ\ìlm\Ãô˜=D\ëz\î%Ç³>oÏ˜.»„‰µGµq2\äŒ3\Î\àˆ# 0M“@ À¿n¹•?ÿ\áHù(Whô…\â7¥\ä\nk\Ãu9\îø\ãùÁÿ|Ÿ\Æ\Æ\Æ|ÿC!\Z\ë¸\å\ï7\ç\ë\ë÷Giyü\ØG¨ªª¢¼¤˜;w²b\ér^}\é!\Ä<8Cqq1·\Şy\']]$	‚\Ë\ï‡¹\ãö\ÛYòúb\á¶r\ì‚ú¦\í¶\Ñ\İ\ÜG&›¥··—@@l_¡\È*j(H\ëölß²Eı)\É2ª¦\á\Ø\â}ü‚d¯1„0¡ßŠ¢pöyç²¥¹™_ı\ïOòØ¥ ùY›\ë´\Ó\Ï\à‹_ù\nõõõhš°Xm¯\ßE\á;\ßø&\ét:\ß^>dY&V\ãŠ]Im]EEE˜†\ëJ$“iŸ$±H—œ{ Æ„iy¹\Ë\Æ*i[‰4w\'y3f\Ì \n\Æ\êºØ¶‹nZ\ÔMš\Ì\ÌYa;°b\é26mh$—\Í‰F¨¨ªb\Ş!‡0e\Ú4\Ò\é$›ššP5\r\Ë6\ÄûH2†‘#\Ó\Ñ\Ş\Æ]·\Üù†ô8c\æLşø·¿\Ğ\Ü\ÜL\ÎIc2Á@˜ú5k\è\ï\ëCA’ÁÛ±j<(’°¤²\Ù®\ë`›\"¿\æ\égÅ¤ºI\\ú¾óG[!]©ª\Ê\ÄI“ø\Û?şÎ†\rD‚\ÖE)\n³nm=\Ãñ¤p\ïYTne•/pôW.\'œt2jjø\à•—‚\ç&w\\†ï‹ºº\Éüı–²yóf3G  ›M£i\Z‘HŒ?ü\æljj*§ûûL|\è¡ü\í\Ö\Ûòš¡\ä\nF›\Ê$¹÷¾»	…„K\Ì0rDA\Ìl\İòoR\Ş\nmq“W4\"\\\n\È\ïHI–Q…šI˜<m\Z\ëj©¬®\Ê\ß\ã\ßg\è‚ñº¸D#E\Ô\ÖN¦¢¢¼\Ém\Ã0ˆ„Ã”—•SYYIkKü\íohnÚˆ\ëºƒ‚°Os\Ùe\ì#¨š\Æ\Õş]z¡p˜­­‰F)--!\Îd\Ø\Ş\ÒBwO²,v\Ïu=¡¡x\Ûnàº¤\Óiz;»i\Û\ŞJWG=\İ\İ\"\'Ø˜`ˆBŒ0?Ád\Ïü?\ê\ØcXp\ÜQ\â7O“M\'\ÒÌ=›s\Î9‡t:U°^§»«‹«/¿òQ>{F\Ş\às]9öXşû\'ÿM}}=x\Ù\ßKJK©_·›oú§ 0\ÇÁõ¬\ërÎ…\ï\ã\Ã£ª¼Œ\î\înnıû\Í$Iñˆ‚w-*.\æ¶;\ïd\ç\Î$	š\'tQˆF£<p\ß}¼ü\âK0\ZÑ€G	#\ïû½>@:“¦££ƒ@@¸÷ºz{(+¯ä¨£\"—ó´M\×W´[  ¶\Ôö™ƒcÛ”––\"y‚_\×s\ÈH<ò\àı\Üq\ë­\èº.”«0x´0úôõ\×\Ó\ÔÔ„¦lf‰D0\rƒ|\ïû¤S)!Œ\n¬ª©X¦\ÅAó\æp\Ú\ÙgR[[\ÛÏ•dL\Ã\æŒ3\Îâ–›şÎ·\İ\"\Î{IYót\è¿\0¶m³\àØ…w\Ò\"*\Ë\ÊÅ˜hØ¶e»†…\ëJL˜XKuu5‘pU\îC\ÃÈ‘H$\è\ë\ëcxxXŒkÏŒ²\ä’L$\é\í\ë\æ‘{bp`7ûÿ`\ÆÌ™ü\î\ÏdË–-$3\é|nLI’¨©™HiI9Ñ¢¾AP\à\İ’$#,\ë@ €¢J˜ºA\"‘ uû6¾ñ\Å/\äÇš¼Î˜1ƒ?ı\í¯¬_¿^m\ĞZyE55Ñ‚1$ù­‡ø\ë¹›\Zù\æ×¾ŒT°\ÈT\ïó”)Sø\Û?ÿAss3éŒ \Ë2‡\Ã\Äb\Åü\éw¢i\ãH\ê¦ı…}\"Œ$I\â’Ë¯\à_ùª\Ğ…œ!´ömÛ¶ğ\êk/‰øV\äl“Á¡!¼ù.l/üX\Ú/d`^2¿1ZƒOÌ’$1a\ÒD&\Ö\ÖR^]É”©S	5,o‘\'€\ã\nF(//\'\Z\"Ë¾Ÿ_!‹\å‰sñ+¯p\Û?ÿN{[’—“\Í0¡½\ì\ã;ı¬sùø§>CUu5C\Ãq‡ˆ\Ç\ãC\ÂoœH$ˆ\r’J&ó¾e\ËY\'£i\Zñ¡8ı½½´l\ŞB\ë¶\í\ä²\"K²¢Š}K|a2–hÀg.\î}T½y†Úº:.ûÀ•¸®‹\é\ØÂ•¦D\"\Î?ÿ|$I\"›®X\ÇqP•+\Ş)\Ãq±«\ê.\Âh4oxu\ßúŞ·hll\Äñ\Ü%¥¥lh\ÜÀ­¿Y0wOğdUM5\ïÿÀ•™­›·ğ\ä£O\äŠ\Ï(5M#r÷°±i\É\ä0Ao¾ÀuD\È\ë÷\İÏ«/¿\ìi”[JŒ’Äƒ>\ÌÀ\à ;w\îDÓ„À+™F _\\°½ó\Ş#Eû§$Á¸²™\'L¤»½“?üú7Bğ\é+1N…0:ı\Ì3ù\ì\r×³fÍšQn\Øh4\n’\Ã÷¾ù\İ\Ë\È\Ï=VPœ¢(œrö™,<zAŞ²vp\ÉfrTUM\âè£\á\Ú\Ë/c\çV1¿\â\â…nx0\\F,[_ù8\î\ÄE,\\te¥e(ªhp]±×·\í¹¿@\Âò÷¡R„0C!\ï÷=&><\Èc÷=B_ğh¼|\Ëh\ãÆ¤s#Ê®hSYd†Pd@V\ìX«\Ñ\ß€\ì¢\Ê\n†n`{™\ÂUdJ\ËùÜ§>5n_¹®\Ë\ìƒ\âwüõõõ˜–Hò\ìx\Â\ÈÉ»\æ\Äl\î\î±ç™”\âhŒh$\Âo¸\×S-¯ŸEÁ¶,¦L\Êÿòg6m\ÚD&›ò\\¼Š¢QQY\Í~ó;š6l\Ø\ï\Âh\Ïoº—p]—	“&\×\0¦iŠNSe†\"3 j¼\í¡ƒÁ \éd\n\Ç\Ës–…Á\"\î\È\áz©\ç}\ç¦[ \Ñwut²f\ÅJ^|ò¸ónV.Yäˆ¤i\Z\áph4ŒP\Ğõ\Éd’D\"i[8®‹n\r\r‘\ÓuN?\ë,şp\Ó?ø\ä\rŸ#\n¡\ëºØ¾¢ \ÇHE÷€‚9¨Bfp\Ğ\Üyüò÷\æK\ßøUU%†\é\è#‘HˆeY\ŞÄ°A$kk\Âa\\F\æ\Úw´ñ\ÄCp\ß\íwğäƒ°©q#¦a\ä³.\Ø\ëi\Æ\Ì\nÏ‹ºúŒ5“k<‚Á Á`UU)**Â²,úûûI$\è^º–t:M\"™ ²²2\ß/»EÁO…–•¿(ÕŸG°L‘v\ß@x¯,\Ëö°}\ë6L\Ódõ\Ê\Õùñ€Gx›\ÖÙ¶ašù9)\Ó«\áı\Ì\ï¶m¡¦\å)¨›T8‡X`!†9\âw]‘ˆR’]UB(B*\áJ$¬‰# \ê‘¨8¢‘\0Š\âRRE„úD8m?ñ~\â³/˜ÿ:#rf~\\º®‹ª¨#„U\à\êlX³–øP‚D\"\á-\Ş\Õ4\îN::Ú¹\á‹_®\ãx›^ú\í*úbd\\û\äº\ìõ¥<ÿ\Ôsôöõ288H.+²;\àÚ¸…,ƒPQ‡¨Š„¦)„‚\ZZ@%—Mc\Û&zNL²·\ï\ÜÉ†\Æ\îø\Ç\íô÷\îıº \É\Ë8\â+l£á ª\"°@–Ba•`H\Ùõ\ÊhA	UƒPD%V¢8\"k%\í‚\rÇƒe‰ñ—w\ãZ\ÎFÈ„ƒ\ã<?_=š¦‹‰]˜)P~/X\Æ\Û~›ø<WX­bN\ËŞ‹=´\Ş\r\ìa¤(\n&\Ö`Z:9=ƒ¢JH8b~Â²)+)\Í\ï§‹F)E°’\ÙBös¡\ZKŒ\â\Z!¹¶c\ã\é\ŞH‘É†><gõò•\Üô‡¿òÀ÷°~\å\Z†‡Qe…€&\"V|!˜\ËeH\ç2dô,\Ã\é$‰tŠd:¤(\\ùÁkø\Çwq\Òi§\ç¬â¹°\Ù÷ş\ïWUU\\y•UTrÃ—¾\Î\Ï~û\'\æ/8\Z\ÇqŒ1<<$A5TMDñhš‚*+b#8\ÉÁv-:v´ñÊ³\Ïó\ï›n\æ±ûdÛ¦\Í\èÙœp¸U\n\Ûö ‘÷™A³Ë¤\Ó\Åb”––RQQAii)\Åe¥•–\Ç\Ñu‘\ã\Ê&p¼@†=BrGµ›¦	%\"{©t/=\ïR-d*®Œ`\Û6­\ÛZ\è\ïë§§«[¼¯§¨X–•/W–e¢Ñ¨`S\Z©°`üı²|;^°±_–$	\"VU\Ã21m/‚\Ì\Z\ÉõeSÿÜ\Ã41t#o\åøcmWˆş	G\"„\"aL[¬›Q\ZY=ƒ\åØ”–•\æû]ò#\n=*~}ı´n\ÛFIY9†-Ü½HbıXC\Ãz;\á8.º\ìr´@`„‰Z\Ö(%¬ptIˆ\Í\ä654q\×\Íw°am#ñx\Ã0\Èfs\èY#g`\èºa`Y¢L\Ó$›Í‘J¥0-‹T*E*¢}G+¯¿ô\n\Ï=ö†.\\Ÿ{I–ˆD\"ùE†%Ó¶0-\Ã6p\\‘‘bw‡c›ùˆH[7129,S¬-SU•phüˆ:_‰±m‡\Òò2tCÇ´,LoÁµe\Û\è¦Š\àW\ãm>\Î\á¸\Ö\è£ ğ\Åñ¬«\Âly~Z\Ğ^²,…;Rû\Ù\ŞıjP,v/\àmg`ÀŸù\Üõ4±Í²\ßP²,\Ó\ß/L\ë@@DL…\Zš¢²yc3­\Û[=—\ïZñFµ(t4\n{½ğº‚Sn!Áy\Z[6“eGK+õ«\×\Ó\ÕÑ‰PQYc{Ö‚–)\Â]\×Á•$\ÊKË°L“H$\Æq\'\Äì¹‡Ğ´q\éd2ÿnşs÷MÓ°<7\Ä\ç\\À~ô\æ¹MS1ŒY=G\"\'IyZ¨°Hr\Ù4¦nL\r“ˆ³r\é2}\ì	Ö¯^Kwg¶·\ÎGh\Ì^›{Y\ŞÆ£&o\Â\×0\Î:÷\\\Ê\Ê\ËG\"D£QE¸45\Ïzs¼\Õü>C\ß\Ò\ÜLË¶m¢}\Æ\é\'!÷FN\Î?ònø\Â\çio\ß\ÉÀÀ@\Ş\ê°m›\ãO8òŠJ6n\Ø8Ê‚ò‘J&\é\Ø\ÙN.+¢•$„ûHõÂ¬+*+ù\Ö÷¿iê´µµ‰\ìÍ…\ê8\"\Ìø}\\@kk+\í;w¢fağ\İ4@4\Zå³Ÿ¿)S§\Ò\ÔÔ„išXn–%„¦Zq/Œ\ÖqÃµÆ‰Ö²<M\×ub±\"ôl–Å¯-yÁ\Æï·c-â“Ÿù;v´’ô\Æb&“A’`x8Á\ä\ÉS9\íô\ÓY·v­˜#ó\æ=¥²‘$‰\êš\Z¾ño“\Éf\è\ï\ïG2\Ù–e¢:œ~\æYLœ8‘úµ\ë0½@€|½`dôû<M\\\Ï\élß¶\í[·a†X@­ˆw\ËY\à\îº.™LÛ±\Å\îÎ‰-[[XñúR^{ñUz»zGqŒ…\Ç\\}„,\Ë\Ì>\è >ûùÏ‘\Ós´wubå““ú‡­ö¿û®\Ãñ]»\çr¹¼»\Û0t=‡\"+„ƒx\ìñ‘\êxl\æ\Î;˜\ë¿p#©Lš®n¡ö{tŠ,cY6†i`\è\"\ï\î_¹\É†P¨üW„¨?ó\äS£›\Åk“©Ó¦ñ•o|\İ\ĞimmE’Eô§\ã¸$\Ò)\Ê\Ê+9õŒ3Ù¾­…¾|ûş}[P…{y€@0„\ëGt˜¢óúúú\Ğõ,®,	·™µu\Ë\ßÿ\Éòe+<?¿=\â~#Œ­qew«eF¢Q\æv\'œz\n\ÑXW’	ƒ^\çº(j€òòrj\'\ÕQ[;•lFX\Z†™\ãş»o\ç\æ¿ü<†]¨yºŞ¼@T½¶¨™X\Ëg>÷½\×uh*’\â\Ò\Õ\ÕAwo†—-9›M#»`˜&™L†;¶\ÓT\ß\È\Ö\æ\Íù²$\Ïßœ\æ†ğ¦!4\è\Øvu]n¿ûN$I\ÆUü54Š,“ÉŠ0ğ *\Ö\0ù.¦î½ŸgŸz\Æcø\"\è`4„\ĞğqÔ±\ÇPV^N<1Œª(ùV¼\Éş\Ò\ÒR^~\î/só\è\Ò\"\Ñ™t&ÿ,Ù›÷®)¨\\\ÇAÏ¥··—H$Š\ì3uo<\èºN(¤§»›\Í\Í\ÍHşÜšW¾_Ëª\ê*x\"]\İ\İ(Š‚¬\ÈºA(*h´]\ßT`ô\Ø\Ë\ïc\ãMY^8û¡‡Nii)¿ıÅ¯	‡\Ãd½T7şxò\ëv\Ôq\Ç+Š‘J¥	b-e#\Ë\Â]m\è&\Õ5\Õllh`û\Ömâ¾‚\çûeMª«cÁ±G\Ñ\Ù\ÙI \È÷‰(\ÏÂ²Dt^ii)¯¿ø\Òø¹\à|\İh\ïye\åe””•+\å·)—e=—%\åm…>\Ğ7€\îm \éÿn\î)›7t}\Æ0{\îfÌEg{;\ÑXt·½²·\n«„\â8t³f\Ì\æ{\ßşNşıız¸®\ËüG2m\ÖLZ[·‹ ²’\"¶k\ç\İh#]\Óºïµ»63g.|0\ßú\ê×…\ÒQÀ\ë$Ib\î¼yL™:•¾^b±/€\à\Ø6©t†	&\Ñ\Õ\ÙAÃš5bü\ï\æY\ï4\n8\Ñ[‡¢(ü\í¶\n‡p]±ÍµBÁ¶¿¦)¶€ğ„¶\Ã-7\ß\Â\ë…Z\àÛ\Ç8÷ş€\êlfÎ\ÅÁ‡\Êô™³Ñ‚‚(D2‰\"«Ìš9‡¹B4RDN\Ï\àº6=]\İüøû\ßecÃº]\Ê.„\\û\ÑOpõµ\×Q…Â´¶¶°u[3ƒƒ}¨^\Ê\Çóı\'†‡\ÙÒ´‰ú5kòY)ğ˜h¡bôM¡°\Ê^qy\æº\Üó\àı„\ÂaI<O(v2CCd2Š\È\ëòğñü3\Ï#\ßbÁ\èV\Za´’$!{“®X¹..®gqBö¬…üyO°\çj{3ğ\ëúöJys˜X;‰s\Î?—[ÿ~sş\\^µ)`v¼‰~÷]\Êş„6\Ş;ù\íï£½,¯~û~\'Œ]Ù£\í±ôøV\á\ÍB”W”s\å•Wğ—?ÿu\Ôy\Æ\á\ï$**+¹êš«ùó\ïş\0şœ \Ä\ãCV”QK>\n\è÷ö‰0’d‰Ÿÿş—”––#»BÛ“e\Ùs?\Äò\×õóI\Ëm·\Ş\ÆóÏ½0¶¨w\r… ¸¬”#Z\È!‡J\È\ÛGÇ²,\É4¥¥\åv\è\ár\È|ôœI.§“\Í\ê<õ\Ø\Üô§ß *ŠX‹P =N›1“o~ÿ\ÇL:\Çq().\"™f\İúU\ì\ØÑŠ\ë\Ú\",Ö²0M\í\"‡\Ù\æ-y†2³Ø£\Û\â­À#!\Ïô€ûyˆŠŠ\n\Û\ßò@Ìmß¾‚ª\áU1\È\ä1^yÑN\Û]EG?<\Ø*H\Ñ\ã3BF~J˜±~ı™‚ÿŠ\ãatû`w\×\ï+¾£e[h\Ş\Z¥\Â\ßóõ)¨£Ÿ­`l{øğ\ß\Û×‚½“\àOl0\ØB\Z\ØF=\ËWşüöİ‹û\ß\rø\ï­ibL¥½…$¸ù\Ç,b“\É<ö9>\ã÷¾ˆ?£®\Øğ‹\ï2§vUB¡¶\çBöó½ü=€å­¡*¤\Ãwûd\ÎHUT¦Íœ†\ZPÑ³Õ¶‰\Ç\ãD\"\Âa‘SSU‚ªHe±¹y3›=÷\Óş†,\Ë\ä²Yv´l§q\İzr¹\ÑX„p$D\Ès\ßmhldÇ6Š‹K©®®AQTf\Î>ˆs\ßw>\ëÖ®ah`P\Ğ(p\å5\×ò¥o|²²*/s´\Ë\ê5+y\å\Õ„5¤IH2X¦Á–^y\áE6¬«§»³Kı8|Ÿ!>…PŠ\ìù½C¡¸\æZ\"‘(.\"^’\Ä\äğÖ­[ˆ\Çã¸¶˜3²,1\Éİ°¾®\Î.o€»^Á~\Åı\Ï+ˆÿıw\ÏT\Ü1\âCÀ\'2\ß\Õ\áº\"\Ê\Î\İÍ±?\á¸\Şv\Ü\î\Ã÷\Ùh§oÁ=™\Ş\èOˆ\äsÏ½A»ø÷\ïR\Î{Ò¸\Í3j¼ømùfBŒ\×\ã\ä\×\î\í	c\ï\İ\ç‡ã€—\Í\İñ–¸\àSDA\İ\Æ\Ì\î8yû\\D\èùş\Â>F\0\Óg\Í \Z‹b\è\ét\Z]\×I§Ó”••QSSƒ¢(Bi!TUcg[;kV¯[Ì»Š<\Ñ{ z\éI:w¶³±¾‘d\"Iiy¡PH8B:•bcS#\É\ä0¥%¥D£JŠ«8ñ\ä\ÓóƒŸüŠS\Ï8‡H(Š¬Hl\Ù\Ú\Èë¯¿\Ìö\í›	h2±XCÏ±}\ËV^yş\ZÖ®\'9œÀ²E@‚\×õ5\ÏwHùGùmRZV\ÎW]¢¨8.È²¸H\Ó4Ö¯_\'Òœ\äÄ¤\ïª«ˆ\r‰2F	¡q\àó\Úq‚\Ğù\ÂÏ…ü‹Ç‡Oœ’ÿ…ûÛ¨cl]\ß\â\á×“B-\Úÿ¯ \Ó\Çô¿h\ÛQE\ì5$_\ã/,v·\ï%0–Aû\çwù¼Ÿ‘\ï\ç7…=—\ã[ò…Ÿ÷\n\ã¶\ë›;\n‡\Ş\èóBûõ•Gv÷6\Ò\Ø…\Ø\ã\ï*ö™0š4yU5UX†`J†!\Â1c±tp\å¨*š@SUÒ©/¿ü\Ò(i½¿Q¨»®KoW7\ë\êI&”–—RRZŠ\"KtvwÒ´q¶\íRUYI$a\æì¹œz\Æ9TW\×	G\è\ë\ïf\ÉÒ—Ù°¡Us	‡¸®C\ãúz^|\æy6¬o I-eY\ÎpŒg!¼£ğ\ÇbÁ˜ô…Ñ´\éÓ¹øı—æ™Ÿ,+¨šB.—cıúu¢¾\Şf®É·\ìõ¥\"·\Ù(a4\æ£N\í9÷½\Ï<\ß+® w\ãôA\ã\"\Æ\\:º÷R>€BòXë®¥÷}¼i\æÿc·õyƒ6zƒŸ\ß2Æ«Î¾z–\×qù\Å\Úc\ßİ·ö\Æü\Ë\ß8n\åöö™0\nL™1\Ûn\0\ßüw‡yó\æa\Øª¢ **²¢Fy\ì\ÑGö-ó€\ëºô÷ôÒ°n=‰xœ	µ¨(¯@UU¶nm¦³k\'Á`€\êš	ƒdÖ¬[\Î+¯>O6—¢¸(.4o\ÜÄ‹\Ï<Oó\Æ&ôœ>ja\áñ®\Ã\ã\Ò×´N8ùdN<\éd/S€Ø›*LgG\ÍÍ›PU\Ó2q%H¦R¬^>Ş¦q…{ˆh¥ñh#¯‘»Œ«\×ÿ\ß\ï9¶\Æ;÷Vğ\Æ÷û\ÊÇ¸v4–ñ½g\àÕ«°z\î^4Cas¿\ÙcO(\è\Ûwj¼\î\Ù\"\çü8§ÀSøv[\Î;}&ŒL\Óâ°£\æ{{\"l\Ñw\Õv\Øab\Ã6YE‘UdI¦´¬Œ\çŸ{–Á\İ\ítø\ä-tu]—¾>Ö­ZC21LEe9•F\æ\Í\ÍŞ®“/½ümD¢šHUó\ÜO\ÓÔ°‘\\vdkn?Ha¿cAIùu8—]q%³+¥wM$f\ëÖ­\ìhİ_\ê8²,\Ñ\Û\İÃ†z‘=¼ D\ï\ï\î8\Â\Øs#Ä›?³\'\ãi?\Ï\Û\Æ.L\ÄK\ï\Ü8\ãC\Zoc\Ì1ú÷=\ß\ï}–\'n\Úõ\ï8u{G0z(\ìvyiÿ¿·yø«FıC\Ú+gl]üso\â\Ûg»ô»OZ£úÄ¯\'{Q\É÷ö™0RU…òº	”\á\Ø\È «2©t†ªšj&Mª.(‘Ê…øPœ5«W!I\á°Ø°\í=ƒ1c¨0rf ¯Ÿ\rtwvP7¹X,\ìm<×ŒªŠ=œv´´ğÊ³/Ñ°¶\\V¤\Íg“ñû\â…%\ï=ƒ¡7~\åkD¢QL[DGJ’D0`\é’%¤³i±…¼\ë j\ÂBZ·j\r½\İ=¢ŒQPH\ãa„ÀeYCñW’$ş\î\Òn…„>Ñ¿D¹£·t\ßø\Ê\É\ÛÂ¸õ•Pde\Ï-5\Î}#­\çaT\Õ\n¾Ş›?-Ö¨cL™’÷\\ÿ\ï»&ˆ(¨ó\Ø\ny\Æ2\è|=\Ç^¾üwÿúq1\íù^Q»>©°>£t\r\ïónÛ»\à{k\á÷Q\'\àkÿ\ïx^ıÆ«÷şÀ>IIg\è\ØŞ†H\Ò#\ÜOşÂµmÛ¶öÂ¥³¼ÿ²Ë<F\à/ò{OÁ\ë#©`‹r}\"\Ö\İ}Û¿¨_³\Ã\ÈP^^L.“æ»\î\æù\'¡§K\ìWò^F~`Jâ³¢(ƒA>ö8\Ê+*p¹\ŞdoË…zz{ó™ñ\ÒõX–•_d9ªüñi%?\İJ\ág\Ç\'rh<è¤\Ú\Ó3v\×s#­ó\Ş@)\Ìg÷V0\ÎûH^vû¾{‰±Ls÷u¡8õm\\€<C,`f{†¿µÉ›?$Ÿ‘-\Ò\Ãx¯´\'Œ\\*\Ş\â\íŒR¾½½Ròn®]Kõ›Vò…\Ï[¨¿ù¸½T\Ğwcû¦P\0\Ûwo\Ğ\ï\ï¤İ½\Û[AEu%}ğR\ÂÁ¶i\å\ã\ßm\Ë\å\Ãş¨7ÀT\\\Ë& Q…oø¯½ú*jA¬ü{^ÿùa”tº\ì\í3e\ÚT\Z\Ö\×\ï\Ã}g!\ê\ï\Z‹’$øöÿ‡SO;\Ës¯ºHŠDQQ¯¿ş*K—.¥¸8\æ\í\Å#Ú £m\'\ŞûP^\ÑQGùR\Çm_øÈ²‚,‹T+\0¡p„™\ÍaR\İb±b´`\0S\×\é\î\ê`g\ëv:\Ú\ÛPYQ\Ğı`	\İÌ› ,!P¤|ğ\Å\ŞÜ«xV‘\â§\êß‹{ö\É¡€\Ù\ì+Zp÷ÀÀ”‚½|\Æo;Ó¦\Ïd\ÊôYTV\× I\í\ĞÕ±“\Îö´\íØg¾{zÿÒ²29\ìV¯X:*¯\à›Á\Øş/2³¥¾\ë\î\à—’#\'>\í\ÖWüùmYU\0I–™1k6\ÓgDiYš¦‘\Ífhok¥­u;–‘ch(\ë]ğ\î0ú„_œ\Î;t>\Õ5Lª«\Ãvl²™,}}´\ïheg\Ûv\\O¯\ßmn´ñ¾«.aò”:$WxI’\'9ö\ØEœt\ÒI\'‘e™€,ö\ãyş¹gøÁw¿ó–\í»Á4\nF@A\çûs,>/•÷BG\ï…\Ñÿ|\Øü#ø\Íş\n’„¢‰9®@HCQe\î¸\ãv‰\á°\Èy&K\Ârzú\á\'hÙ²5_® \ÊüSvd>SÃ»\Öu]¦\Ï:ˆK®º–\ãN8™	\'‰D‘‘¾\ÇqLS\äÀko\ÛÁk/>\Ïò\×_fó\Æ\rƒúv!*¿|ÿü´³¸\æ\Ã#ZI\"2\â\Õ\çŸ\ç•\çŸİ«H\ÆÒ²2N=ûl\\°Pdñ¶¤(p4x“lªª1\Ğ\×\ËÀ@[7ob\å\Ò\Åd2\é|*)·€Cù\ÍUZVÆ™gŸÃ‘E.h;)ÿŒ\Â5ö¦a\"+2\ím;X¿f%õkVaxiu|&/£ ó‚\ì¥F’$™³Ï¿ˆk>v|’·9œ¦id2il\ÛÁµ¶47ñ\èwó\à=ÿoñm\ÎÛ¹µ\åü\î¯ÿd` >n\Z¡ünô\Ş+¨2(ŠŒ\ZPˆ\r2e\êd\ZÖ­\åW?ÿ%\ä3xŒ\å¾#Ÿ&\Ö\Öq\íG?NUu5†iD\Èf³¬[³†û\ïøWşzQ\Â\èñ…Q8\áÌ³\Ï\å˜c£¤¸„d*‰¬ªdõZ(Œ,KX–Ø‹J\×sôu÷\Ò\İ\ÙAË–fš64Š’\Ç¤‘gzOt]\Â\á¹\\–P8\Â%W^\Ãù—\\Bu\Í¡ti\Zx©zlË¢¿o€\r\ë\×r\ï·±~\Írt]G–G,˜\×¶‘1\rƒ@ ˆa\è‚A.»\êZ®ü\ĞG˜4y2ªª¢\Ä~r ”¾l2CWg¯¼ø<¯<÷4Mk±m›h,¶\Ë\Öõ\ïF\Ó}\É3¦q\Şe!\Ù\"\í¼\È\Şm#)*\×]wzV„|Ë,˜¶eğ¡k>\È\ÖÍ›\Çõ\Ş\Ä-€—+ÿuŒĞ‘$AJ\ï3x<\ì\"Œ€[ÿ}r8ñ\á8 \Èö[VVBCc=O=õ±XU‘°m\È%\Ó\Üş[p´U$ÎÀÿÍ·\0\\\à3_ø\Z\\z\Å\Å1&Nœˆ\åŠõK~2\Ğ`0Huuªª’N§\é\î\éDv\Ò\Éa^zöY~ş?ÿ\r¾\Æ_\Å\çõ’\'\ĞÎ½ør¾ğ•¯2c\Æ4\ãC¼ø\Â\Ë|\ë\Æ\Ï\Â\ÍsO˜sÈ¡üô×¿cú\Ì\ÙÈªV°;Ûˆ0ò\ÛB‘E>:\Ã0ˆ10\Ğ\Çós^|î©‘¶/F#\nÁ‘ü\èg¿b\ÆÜ¹Ø’_n\á\à\ã\ÍqTI$†5tL&EWg¿ûùYö\Ú\ËH~: q4g\Çq¨›2\ïüø—Ìš3—ªª\n\Â\á ª¢\Ò\ŞŞ†mYDc1ŠŠŠˆF‹ —\ÓÙ¶i_û\Âg\èØ¹#¿gV!\0½ø*s=ŒtVß¥\Şùü|ˆ…ßš¦L\r\ãº6S\'\×q\ï½wóû_ş’-šò×\'Œüo²,s\è‘Gñ£ÿı%S§OC–eşy¾ù…\ë\Ée\Ä~F#C£e\Òu]\Ê\Ê+øõŸş\Âñ\ÇO&“!Z\Ã	°½½\Ğ\0$I(š\Ùl–\\&ºAOg\'·\İ|\Ï?ı8¹\\.¯Œ\Ê^“;\Í\Û\Æ\ä\àC\çóõ\ïÿ„º)Ó©›\\‹$¹\èFd2‰aƒAJKK‰„\"´··“L$X¹|)¿ş\Éˆ \Ë\n¶7\ëx®j\ÕHµ“§ò£_ü–Y³\çP\\Z’§£´·=‹\"I„C\"\éq(ap \ã¸45®¦±a57ı\îWû\Í0vé·\ÅK\"yÎ¥2u\ÚTp\\pE§Ä‡“œp\ÂIœzòiä…‘\"\Ë<÷\ì\Ó|÷[\ß|o†y\×B£\éaö6\ì~‚Ïœ|‚<ù\Ô\ÓùùoGNM%PQ5…;î¸ƒt:‰ª\Ê(²·²——zm›¶Œ£1V\ã£<STUşz\Û\İÌš3—¢¢\"\0\ëÖ­¦­½m[š\Ù\ÒÜŒ¢\ÈL˜8‰‰uu\Ô\Ô\Ô0u\êT\æÌMueÿºõ~ñ\ßÿ\Íğ\à`^\Û÷	´®—Q\âÿû+\Î8ûL\Ç$—\Ë\n„ùğ\å³usó˜;vE\'\Äÿ÷—”UTÑ¾³ƒ\Æ\Æ\r\ÔM®\Ëÿ\î8®#\æšJ(¤®®’’Ò©ƒƒƒüò\'?\à…gŸ\Âõİƒ^ƒù2\'Ÿr\Z?ø\É\Ï	\ÑO°j\åJ¦Ï˜™\Í(l\Ë\"VTD@Ó˜8q\"Á€KOw7?ÿñ÷xı\åG+}=cöÁüÏ¯şH\İ\äI”–•2\Ğ\ßKcc=›\ZhjÚ€ešƒAš7ƒ\ç\ÂüùGRYQ\Í\Ğ\Ğ0™dšO}ôlÛ¼iT}\0B\á07\ß{/®,“3¼<ƒã€\ë8È’J0¤fB5Õ•¬[»Š_ÿ\ìg¬]¶b\İ\ìNÅ¢QR©\×ñ«\\ó\á!+2Z @:\ægÿı=|ô\áüµ…¥‰RF\ÊR…Š\ÊJn½óªkjH&“ôôõbJ.¶\çš÷\çc\Ñb\Ê\Ë\Ë)-)AÊ‰\ì\ì¹\\\åKóıo|	\Ã\ĞG)yx)y\\\àğ#\â»?ù-U•D\"a::[i¨_Ï\Ö6oj›\áM›Bõ„‰Ìœ9“c9\Ó4I§s´\ïl\ã\ÆO|”\áøp«\Ú6HR~:$ò;\ï£v\Òdª&N ½½ukV³|\Ùbº\Úwb{ù\é&O™\Æ1‹N`\Ú\Ì9L¨©£¬¬ˆ•+ó»_ş„¦uk±Ì·\ï\"~+Õ¾eøÌ¨v\êd.º\êRl\ÓBxY$]l=ü™\Ï\\/IšÂ”µ½<v7\ŞğYV,_6¶\È÷&Æ´š?ğ\nŒ$ÿğ\á{^\åz\ìIj§L!•Î **¦cRRR\Â\Úukxö\Ùg©ªªÀ²,Ç¦³£“gxL0\àü{=\ãú…¯—3\Î>@P\Å4u–,yG¼Ÿ-72<44bUz;î––—3mö,Î¿\èB*++ùÇŸÿB\Ã\ê5È²,4:©ğ	b\ëeI’±,“ƒ›\ÏOı;ŠŠKX³v\r\Ç<©dŠ\ç|œ_üh\ïƒJ>\î8¾ı\ß?¢8V‚n\Üú¿ó\à½w‰DÄ˜öˆ^–e\"±¥¥eœv\Ö9\âIÌœ9[¸\Zw¶òÑ«¯ W˜\\’ò\Âh\Ñ	\'ò\ïÿ7•5Õ´··sûm·òØƒP\\R‚ûWÙ¶¬(D\"Qj&Ld\ÑI§p\Ò)§1u\êT#G*™\à¢s\ÎÀu„—\ÂÖ®\ëRT\\\Æşq“&W*´w\ì\àñ‡\âµgG\ËöQÖ¼$\ËL?h&§}]|±HŒ@0Jow¿\ær\âC£—g”WTp\ÕG®\å©ÇŸğ—üu‡\"\åŒ?ÿ\áº&M\ãª+¯\æ\ä\ÓNb\í\ÚU<üÀ<tÏ½0&9\éx$y´5qR-¿ı\ë?™5k6¯-~GI ¤y\ã>ò\Ë„_Îˆ`“üm^,‹òŠJşzó-TWW\ã¸.ÿø\Ç\ßXúú\ë‚¾‹K\ä\áTMš\ÈÜ¹óXx\ä±Ì™;¡¡!B¡¯¼ğ?ÿŸ\ïd]÷\ŞC–e¦L›ÁO}\Õk	…Ã¬[¿Š—^|˜×{\îö.B\Şv¦i™>w\ç\\x\çœs±H\ét†m\í|\æ\Ã\×\à\Ø6ª¦ay\n¼\ëº\\t\Ù\\ÿ•¯¢*\Zmm;¹ÿ®;xò¡ûÁuF% /\"1g\Şa\\p\éÕœ\áûx\à\Ûù\ë/…³7\Ú\Ûg¡\İxLY–e†‡\âT\ÕT1¡f\Ù\\Fø,Ut:…eYÌ›w\édZL²\Ù.@…G\Å÷\İ;j®¥p0\îwH\Çn „\ÒØ³\ï}\È^”à¥—]\Î—¼ŸT*…¬ˆ-«C¡9=\Ë#<B$Bööe‘$p—WŸ}‘\á¡ø˜\Z\Ésaù]Y\Ø|‡~$ÿõ\ÉOc\èBÁ >xw\Şv3M\ë\×c\är»° Ç¶\ÅF;v\Ğ\ÔØˆ$Á\Ë\Ï=Ÿ3\â\ê‘$~¢YŸ	\ês_d\áq\ÇĞ¼¹™ûî½‹\Ã;„P8L]\İT^{ù%\Ãc\ßcW(ŠB\í\ä)œz\Ú\é€Cfx˜\íÛ·°~\í\ZrÙ¬\Ø5U\×\Ñs9C\'™f°¿\åK£CL6•h4BWw\'Ë—,&™L¸’0y\Ê4p‚˜P$64\ÔÓ´a\éTJ\ä4\rrÙ¬·C‚¾\ŞnV,[LiE%3f\Î@V «»“K–J&óOö\æq?ú©/r\Èa‡\n\Ëtu\î\à\Îÿ‹‡ï¾›¡ğv\Ëõ­(\\—\áÁ!š\Z\Z\É9fÏ™C8Æ²-ŠKJX¾øµQm$\É2;wì ­e;ƒ}ıôö\Ñ\ß\Ó\Ç@o¿÷w€ø@œ¢\âW]ùA\ŞwÁû\Ø\Ù\ŞÊ£?\Ì\Ã÷ÜƒmY(\êHøüx$¥zô@k>ú_s\ì\"úû¸\ã\Î;™>c\ápˆ\Òò\nš7n cgÛ˜»GY*XnQRR\ÂE]‚¬©Ø\Ø\Æ\åÁ»\ïa ·¾\îúº{\è\í£kgÛššY»r%;\Û\Û(.)\æ 9³‰\Ç\ãLšT\Ç\Æ\ÆFz»»ò‚\ß\ï\ÓO}ş+Ìœ=‹`0À†\r<öğ=<r\çd’\éQK!\×Á±{úiªoÀ\Õdf4\\(«(\'—\Ë\Ñ\Ô\Ğ0*A°¢(\\öP7u\n¡P€x\âûI\ÇE\É~_z\n$Iö÷²ô\ÕP\Âš›\êiİ¼p$¼\ß,£}\ÚMğ$‰e¯.¡·»M\r\"!|¦%%%¬X±‚mÛ¶-‰bY« 65Õµ|\ç{?\Û{)\ë=w\Ì1ş¿°€\ÆÀ×˜k\ë\êø\Ü¾D:š«\ë†©¨®\ä™\çŸA’\\4EÍ§¢·›Æµ\rtµw*o¤\rv/¹}¥åŠ«?ˆ\Íj¬X¾„\×^|¶m-#\×H[\Ò{\çü\ï½}<ùğ£y\í\Øö6Š?\ã x!\Ø\ÓgÄ±\Ç/\"‘ˆ³qC=‰¡\Z6¬%¨Š0\â÷_qu¾^’´\ç¸[Ç²pLEr‘\Èf3»Œ\×]şgŸq6š*c\èÏºÙö\"\Ë`;&Z@!Ma\Ùb‡ZUU‘dÇ›“ğË·½y¡\"\É`KØ¦ªŠ…\É>Ç¥²º†SN=\É\Õ1²)^}\å%^~\êiL\İ\0o\ÔgĞ¾@r=—\ã\Å\'Ÿbñ\â\×\Ğõ,º\å\äSO£²ªz\Ô3r\Ù,m;½\ç	e@ñ„›¦iÈ²\Ì\ÜC\çñ¾K.æŒ³O¥³»gŸ}š§}=§‹ù,OC¿uF,Xq\'~€Æ†\r\rôu¶³±±\×vI\Ä\ã\\|Ù•hš6Ò·\ã”SH·’©cy›Wúc\Î?ü\çÊ²Œ©¬]¾Œ{ï¾•¦\à!~Á%—Š²¼\ë\\\×e\ÖAs9\êè…¨ŠC2\ÙÃª/ñ\Â\åûÏ\Ò\ãx¤–Ãƒq^y\ê9V-_A,\Z\Å\Èe¹\à\âK\Ğ4-_—üµ\ÉF.K.“f\ŞÁs9\çÂ‹˜<u\Z5&+*\"\n£yıPø.\Ü}\r«\×#\Ëò¨5‘\ï6ö©0r<I-\Ë2Cƒ¬_½6?™\çG\Åb1üQ²\Ù,Áˆ\È\æ-\ËB\Ë9\ç\Üó9\áÄ“QU5Ÿ\é;\ì‘1ÀÛƒ?˜ÿ§¿RZZJ(b\âÄ‰TUW‡yú™\'iii\É+	®§5§“I–¿¶8¯u!AŞ\ŞW@ôE\Å\ÅL™>…P8@&¦¹y\ëÀ«“_\ËHº ¿|Y–±lÛ³„›\×e-°òu¸\â\êk\Ñ4––V­X\Æ\Ú%+h\Ú\ĞHOO¦ir\ÎùR[7%_\Ö\î\àzV—„ƒ\Ía\Û&¡Xs\å2š±9±s\Æ9\ïÃ•À0t\Ò\é›\Z\é\î\ê\Zu½ñ\0‡t.\å:¨±­¼iš879\î	UU©ª©\á‚÷_†¢)¤3I¶m\Û\Ê\Ğ\Ğ\àH™€\ë:~\ÄB!°ii\ÙÆ¦\r¤\Éü{K’$òyı\ç\×q‰±nõ\Z¶µ´FI&“L1}S,ü (*–iŠ-\Ì-‹³fó‘\ë>É±‹\'g\Z<÷Â³<ş\Ğ#ôõô\n\æí§İˆ\"\É¾Š¢pÑ¥—SZZLgW;›6m`\íŠ%,[ü:;vl\×\á\Ãcş‚…\â¾1õ\ÚW\Ñ\r#›#AA?‚^…\íc\Z&\Û6maÓ¦&\×\"“IQV^\ì-øcùğ#D’]\\\×dû¶Í¬_½=+\rû»Ppı<•’D\Ë\æ-4¬k µµUAÛ¤z\âD\\\ß\Úñ\Úk\é\Ò\Å\ìhmÁ²]gş‚#¸öºOğ_7\ÜÀõ_ù\Zÿuı\r\\ı\Ñ\ë¸òC\ã”3\ÏföÁóˆ3\Ğ\Û\ËP_?²·¾kaŸº\é(DŠ¬\Ğ\ÛÓ‹\ëºL™6\Çó[»®C:¡·§—£>\Ë\Û\Î\Øu-$E\æô3\Ïb\é’\Åôtw\çµ\n_{?€}\Çuù\çm·q\â\É\'\Ò »»‹µk×°t\é^~ù%\Úw\î$\Z¨˜–\"\É8¶Ã£÷=(²v\ÃL}\åa<\Ò÷ûr\Ö\ì\Ù\\p\É%\è9D2\É\êÕ«hj¨\Çõ\ß\'\â±ğ‰\Å/Û¿\Îñ„D¡E¦ª*–m3y\ê4>ö©\Ïb:[š7ñ\âSO‘I¥°l›šI“(**\åƒaV­XŠ$I¼y„±$‰Iµ“8ù”S\Ğõ,©tš\í­­œrÚ©œq\ÖYœv\Æ»\è8\Î>\ï<N<ù$>\áN<õtfÌšIYy¥¥1Z¶·ğú«¯°y\ã˜\Éÿ\r|\Úô\é·h¦®\Ó\Û\ÓKÿ`G{4\'v\nÇŸt\"Çx\"§yg>GwÇp\"\ÓfN£¼¢Œòòbšš\Zy\áùgiŞ°qô3€O9•\é3g ¹ñø\0+–.¥³½#Oc£Z\İO\Ä\éE\É9Cõ„\Z\æ±€¢X”\Şn666\Ò\Ñ6\â\ns\Çô\ã8hZ\0p‰D£|\ïG?¦²²‚	&²bù2úY\êW¯\Í\ß\ï3\á±#\ïŒ?.´@€\Ï}õ«\Åh\Ü\ĞÈ³O>A_w7\Ùlši³fQQY$Ayy%/<û4Á`Pˆ±…z(*Šq\áEc™–i‘N¥xú\É\'Åˆ’F\Â\Ë4@6“eÚ¬Y\Ô\ÖN&\nJ\'Y¾x1\éT*¯4¼\ïâ‹™0q¶m388À+/\n÷¶$‰>]Fúï¼\àÇ¶™X[Ç¼y‡PUZ¶µ°iC#ı}}yÁ%I¶i1i\Êdjjjp\\‡²²R¦M›Î„	¨®ª¢¶¶i3¦1y\Êd¦NŸ\ÎÁ‡Æ±\'\Â	\'Bg{;}½#±°O-#…f\æš\å«hò\Âo´ŠŠ2v´µò\èc+)´@\0\Ó4‘$‰Ÿÿúw\Ô\ÖM\Îgşv]÷€…ô\á\àyó¨ª©\á\égŸañ\â\Å<ó\Ì3,_±‚–\í\Ûq‡   j\är9¡…\ÉO?ö8ııo¨ \ì*JFüóÁP\\.C6“\Æu]At~ø\ì6\æó\ÇÃ¨c\ìE,\ËB‘e.»\êƒ*½½½lnn¦}\Ç,\Ëb\Û\Æfº:;I&‡I$\âœ}şû()-\î\ã=¼›`°\"3}$\á´\ÓN\ã\È˜5{63f\Î\àˆG2y\Êdj\ë\ê˜2u2‡~0šO¬(\ÊÆ¦\r¬^µ’•K\Ş X\Çs=\ê†A,\ã\ÄO\â\Ø\ã\ãğùó9ô°ùz\Øa\Ì9xu“\'3e\êT8òp-Z„ªÊ¬Zµ‚Õ«V²\ä\åWF1M–e`™9rFğrIZ™_(NF\à[¡\ÕU5TVV084H,¦´´d—\çø}\âÓ¼e‰Ÿoü\ê7(«¨\0d\Z\Z\ZX½r%‹_zÇ‹T‚h¤œ]k1‚\ß%eUlß±ƒ\Î\ÎN6oÜˆtµ·³us3ııırø‚#˜¿`\á¸k¢Æƒ\å\í:€\è†q\á¿¥>u\ÊdY.[\\‚A±ş\Ìœ©TŠT*\å)pª,\Üe\ã\àø¡÷¾w¡\à³eYC!\ê&M¢¸¸\Ã0¨¨(£¢ªü…\Û^»õtvò\ä#ò\â/044D.›¥¿¯d\"!Ö¹šªR\\\\L]]-s\æ\Ìarm:–?ş\í_,<\æø|}÷\Şa\ä3	YÅ¿ü\ì\äRi\\Klòd•••¬Y³†—_y‘²\Êr2z\Óv©¬À_o¾òŠ\n\ì1;\æ5‡\Ø\'hÚ°‹\Î;|ó[<õ\È#X\Ù,\ÕU”—• \ÈiH²‹\"\ÉƒAV-[A{«Ğ‚\ßx\à\îú»\Ïä»»»iİ¾\İs\É8\Â%\ŞÎ­oX¶€$I„‚A±}\áy\ï·\Ê\ê\ZN9\ãL\âñ8¦i²n\åò|\Ùz.Çše\Ë0ôñ\áA,;\ÇU¼Æ­ùhøŒbpp\æ\æf†††\è\í\í¥»»›¶¶6(//§¼¬”\æ\æ&}\äa}öiy\à\îºõ\ß$\â\ÃùD³\ãAò,>\Ã6\ê§e{+=½}\ìlï §·‡\Î.úûû\Ñ4h,Ì†\r¸\ç{xú©§xúñ§¸û¶cšÖ¸.\Çöö÷aÚ†p…H(ùı´<ú’üÿ„ ’½9ªò²r\áªM\'\é\é\íb81´Û±ğ«ª\ÆU\×|„ÃXÀğğ0\Ù\\Í›7óøC€\Ç\Ğ\íüV\á#\êla©…T…¹\ìƒ\×248L&m²q]=–aˆ]—5µ+V`¹\\t:\Í5ù\è¨:îƒ¸®‹iŠe\rc\ßi\×,v¶\ãp\Äe\Èd\Æû°Ñ™\ë·l\Ù\Ì\à\à\0v>ZM\Ü/±†\Æ\" \çrL›1=—c8§ —\áxY)Xl\ïİ»­i÷\Üö/¼û–.Y‚\Ó\Éesd²ÂŠO$$\Ã\'ˆ\Ç\ã8¶Mg{;}}\İ|ûû?\"i\Ûöö¹›Î‡\ëºùI9\×qÙ¼i33g\ÏB\rˆ‰7×…p8DÓ¦fl\Û\â°\Ã\'•J!!‹g\Ñ(gœu.¯½ú\Ãñ¸˜ •\nzƒv·£\ê\0\ŞR\É$­Û·³¡¡u«\×040€¡‘\ÄÖ¶Y¾d)«4ú\İ)¾\Æ(Jd9ú\ZS7˜2c\åe8\Ã1\Ç\Ë#>€m	†4–Œ‡üs¼zä£‹<­UUU®ı¯\ë˜TW\ÇÀÀ\0Cƒ},_¼˜Ò²2JJK	x¡´G,\\ˆ¦ª$’	[t<O?ñ©dbô\Ã<H’Dm]ÇŸp<\étšl.\Çò\å\Ëyúñ\'h¨¯§a}=kW¯ah(N,#\Z‹°³½\í\ÛZ¹ÿ»Ù¾uÛ¨9Ô±eû\Ç\Ô\é\Ó9ê˜£1LƒT:\ÍK/¼\Äk/¿\ÂÆ†\rÔ¯[GıºuÄ‡‡)+/§¤¤„––677ó\Ğ\İ÷²³UX~¾:\ë0k\Î,b±\"¢‘S¦L\á\ÅgŸCö\Â\Òónq¯}ei$ƒ†m\Û\\óÑ!+.6}½]¼ú\ÂË¤#{H\Â\Ä[`»\à\èc¸\á‹_¡««Ç±io\ß\É=ÿúCı\"`ÁOKSÀ\æG³ü‚ó’Ä…—^Á!ó\ç344„Ë±ø\å”–•QT\\B6›e\ÎÁóˆ‘N§™u\ĞAÔ¯]K_\ï\î]QE\ÅÅ¼\ï\ÂIys‘–iò\ÌSO‚÷L—\Ñ\Ò\Ñ§EE\Å\\q\Í5ôöv‚\äÒº½…•KüŒ	#j§Ïœ‰,\ÉTVVQ^VÆ’\×^…7P\êl/P\å“\×t&,KtuuòÚ‹/‘M{\Ù-\\\Õhp]=›£³½ƒe¯¾\ÆÓ?\Æk/½Ä«/¾È’\×^e\í\ÊU¬[µŠÁÁ&O™B4Á4-\Ò\é$c±³m;\í\íc«ñ®\àF…PC\×Ù¶e+‡z(’§!k\0 FSS3®\ë0w\îÁd²9$Šb1N<\éT64¬§¿¿/\ÏdF0v¸ÀÛ…mÛ˜†Ao­\ÛZhX»–­[iŞ´‰¶­-y+ÕŸ8×‚\É÷Q\á™£!\É2••L¬„ªjD£J\Ë\ÊYµbÙ¸.2ÿyş¼…¦8ìˆ£(++§·§\É\'jùI’DIi9\×\é\Ëtv¶SYY,\Éu\Üq|\à\Úk¹ø\Ò\Ë8\ê¸E±p!¡ph,JGG;\ÅE\Å(Š\Æúµ\ã\ïB\ì£E\'\ÏP|€l:\ÃsO?C_o/½==ô÷ö\Ñ\×\ÛK\í´©TVT\Æ8ûœsql‡†õ\ë	x.iŸQF\ÓgaO$°m‡\\:Ë‹\Ï>K_O¯wô\Ğ\Õ\Ş\Î\ìƒ\ç\ä·d9û\ìóÈ¤3ljÚ˜/w4½X¦\ÉÁ‡Lqq1¹œÅœ¹‡Q¿n}=İ¸‘V~›ûeÈ²Ì¡ó\äªk®¡½cŠ\â²c\Çv–¼¼Ë¶ò<L\"\î))-\ç¿ÿ\İ\İİ¤R	dE\æ\áû\ïcóÆ\âZ\Ï\Z–\n„\ØXw\ïü÷J\ÄQ5	Yv9ò˜c8ç¢‹xÿ\åWrü\É\'3Á‘„\"a&MšD?¡Pˆ\êš\Zš\Z\Zò)Š$\n\Ç*q\Şù\ï#c»®\ëğô“O	Y\Ğ7ş†8\á”SYx\Ì1ö.Û¶nc\Õ\Ò\å\â^›†ÁœC¥¤´=—cÁQGóä£bB`I–\ç\Øg\\øş\Ë8ñ\ÔS\é\ê\êÄ²u\Ú\ÛvğúK¯\æ\éK*TÄ¼{\\oA¹eš\ä²Y\Ò\é4\É\áaúûz\é\é\êbÓ†F|ôQJJË¨¨ª\ÄuR\é$[67±s\Ç\ØPøwïˆ›Î‡/©TM%•Lqÿ\İ÷’IgP5\Ë2‚LªÀ‹/¾\È\ã?NUu\ÑhÓ´I¤²TTVó¿¿ş§~f¾\Ìs\Ças°¯\à·s_O/½]bò\×\ÛÒ¡°ow‡Q¬eÌµ¶eÑ´a$“qZZZ8ÿ\Â9õ\Ñ\ÏxŒ\ÌweùZ¾ŸÑ»n\ÊT>{\ã\×øù\ïş\ê1EQ	ƒhZ\0U\Õ8\ï\ÂK\Èd²¤\ÒI¶µl¥§¯‡şş~V®\\\É\âÅ¯\ÓÚº\î\îN\Ú\Ú\Úh\İ\ÑB8¢»»›K.»’’\Òò‚Ú†$I8ù\Ô/¦i {Y\İ5MC\Ó4’\Ã	^|úYv¶·\ã:­\ÛÛ¸üd\Ê\Ô\é¸\îˆP\İ=Dg2l\Û&“\Íò¢»dYFUUR\É$O<ü½½=¸®\ËÎ\í|ò³Ÿ£ªºMŒ(…$\Ë\æ¨_³\Ş\Ş^2™Û·o\ç{ÿóc¢±Xm‰\à\n\èxÚŒYüôW¿¢£c\'®k\Ó\Õ\ÕÉ¦Æ\ä²\ÙQ}]\ØÕ\ãğ‡¿\İ\Ì\à\à ;Z[©­­£}\ÇNV¼şz\Ş5\çø^\İ`\ì/gœy.Š¦\Ğ\ß\ßCWw;}=ôôv²©yK—½\Î\ÆMÄ‡‡ˆ\Çil¬G’\\¶ooaÁ\ÑGS^U5¦´ˆ~õs š\Â3ö¢1¨›2•¾øš7mD\×u\á¦İ¾c\ä}<~\Õ\ß\ÛKÓ†R©$©tšn~ş\Û?\äiÈ§)\Çı\ÄùG.\äº\ë¯gË–\ÍH’K__\Ë/J—…Œ7&\\\×\åº\Ï~–\â\â=#/\Ôü>ô¯w]Y’˜6m*EE1dYb(>°G\Ëñ\Æ;oy»„ºĞ´2™››š™1c:\ÑhÛ±±-›X,Ê\ÖV¶·lgŞ¼\Ã(Š•£I§A’9üˆ#()+e·ÿ‘ªª\ÙüF\Ã\å\íB\Z‡\Æ;÷†q´T\×uÁm}#A\ã—\á\Ãu]\âƒC„£aj&L\Äuz{û¸ø’÷3g\Ş!\Ç\ã$†\ã\ät‘ZE\Õ4ªªk8ò¨cø\èuŸåš}’T:M0\ä\àƒ\á¥\çŸ&\Ë\Î4))-\ç³_üƒ}Ä‡†XòÊ«¼ö\â‹lŞ´‰\Í›¨_·\æ¦\rl\İ\ÔL\Ã\Ú5¤’I&Nœ„,«AdY¦aıZB¡P>ª\Îw­\Õ\ÖMf\Ññ‹\è\é\éÅ•eúX»j•ˆ\Ş+~H£j*&M\"›Õ‘PX¸pO=ñÈŸ\'qsh\Äu“\'s\è\áó\é\ë\íCF,•X³jU¾\íüö\ì ¸´„’\Ò2e\\W\âÈ…\Çò\Â3Ox®/9ŸñÀ/[’%z:»™>{:eå¤³)M\æ#\×}‚\\.G|(\î¹\Ì\íVVUsÕµ\â«\ßş6\í\í;\é\é\ílv´m\ç‰\È\Ïõˆ0|)ÿJªªò\Ãÿ’ò\Ê\Z\Z\Z\ÖsĞœ9\È\È|\í\ÆÏ¢j#‰b}F\ê#r\Ìñ\Ç\Ó\Õ\Ù9ja§\ëºƒA®»ş–\Î\à`+—¼\Î+\Ï>\Ç\æ¦&6o\ØHó†lX¿Ô¯]K[[+\Õ\ÕD#\\‘¥\á\å—F\\ƒ^Ù’$QYU\Å\égIWO\à\â\Ê2\Ï>ù4ªw­ªª\Ø^}¦NŸÁù½Ÿ\Ïõ«´¶m\Ã0uM¦`€g}‚\\&›oo!\Õ\\z»»™:s\Z\Å\Å\Åtw÷0q\Ò$>ş\É\Ï\æƒ2™¡pÏw—]u5Ÿ¾\áslİ²™d\"I&“fG\Ëv}üIF”=\É¢\Å%%\ÜğÕ¯bK\å\ÕÕ”1\É\ÌÀ\ë—Iu“9ñ´3(*+\Å\ÅÁ²-zz»yõ…—öÛ¢W\é]1-¼§ˆ\Ğno¢$qñ\å\ïg\â\äZ\0Gü>84LEE5\ç}1“&\Õ\Ñ\ß\ÛC6—!1<„$\Ût¶\ï\à¿ı-\í\ÆY(õ\ß=øCø\İ|\æ[„$q\âI\'Ñº};\í;w\æ\ÛK*X7JC—\Ä£\Şğm´­T\à6’$qÕ‡¯eò”iCA4M£¦z\"&LÀu²¹†i‰`˜CC	zzz\0H\'‘€»nı;ı½]Car\Ù\ï¿òj.¸ô¶l\ŞL_o/·şõ/8^ä’¿ö\Í>^˜ğ\'®ÿ,UUP•\Ógrıu%1<¼Kİ9nŸ¾\áz¶l\ÙBqY)››6ñ¯ü#\ï\ßwFˆĞ¸\â\Úk˜6u&Ù¬Á\Â#\ã±G\î\ã®\ßL,#U!9Ï¼€N:‰«?ô!\Úw\î$VTÄ–\æfnùû\ßG]\ë\×+‹ò\ÑO}Š²òJ2™,\Ëc<\È÷şKX³c”ÿU5\Õ\\ôK©™0S·(**\ÙB!Ò©™t–’’2ŠKJ\è\í\í¥­m¹\\U•\è\î\é\à[\ï$O\ä\Ë÷ƒ%\ÇA\Õ4.¼\ä2®¾öc¬^½šH,\Ì!‡BË¶’\ÃRI›ŠŠ2\ÂQEµ	ƒ˜†A6›¥¸¤\\øô}LÔ·€\é~\ÄQ|\å›\ßcÃ¦õ¤2)nùÓŸÈ¤Rù\çû´\ì…T«ª\Ê9ï¿ˆ#\\ˆ\ã8w\Ì\"¾xıgØºyóˆ\å\è\Õy\ÊÔ©ü\ä¿`ûöm8’C4Z\Ä\Ô\É3§\ÉdÓ¸.L<YĞ„\"3<<È¶­dsib±===¼ğ\ä³lÙ°)Oc>oòÆ”Ó¸\èŠË¨ª¬!›\ÉQV^\Îô\é\Ó	‡B\Ä\ãq¨©©AVU†‡‡ÙºE\äLT…m[6ó\à\İ÷\à\Ø#yò@¸m\Ë\âù0\'œ~*;w\î$\na\åDt²iX˜†ªj¸Xq%‡`@A\r(ğ\ì\ãO\ĞT¿!\ß&\ï6\Şy\ËÈ‡—9\Ù\'\n\×ui\Ù\ÖB.“aò\äÉ¨Û²	†Å ¬oX‹m›LŸ1$Y¤>\ÑudUåˆ£\"\ÔØ²©9?%‚ñ]Á»#\Ã÷ù	g@\ÓùE‘u“§ğ\é\Ï\ß\È\égŸ\Ã\'>õi9üp\Ê\Ë+H&†E4Î˜­/„%\ã\rğü\Éwş=\×\×©¨ª —\Ë244Ä­tuw’\ÍeI$†\Ù\Ù\ÖJww\í\ímô÷÷’N%h\Ù\Ú\ÌO=\ÆsO>B6#’mÛ„#>÷¥¯\Ò\ÑÑeY<óø£öõ!yD\í\"ÁPY–I¥S4g.Ã‰%%¥\Ô\ÖÖ±rù²Q\ãVòæŒ^´ˆ\Î\î.4M£¿¯õk\ÖÀ˜\Ö\nƒ\è9¾\Ş~¦ÏšMqq)½½=\\pñ¥lÛ²™––‘-7(Fªª2y\Ê]´ˆÁ\Â\á0[š›\Ù\Ô4’\ÅZò\Òô(Š‚eštuv2m\ÖB¡Ã‰8\çw![·l¦»³#O#cR6›ek\Ófb\Å%TVU’\Éd\è\éî¦««‹t*C6›¥³«‹\Ö\íÂi™™lŠõ\ë\Öñ\Ì\ÃOL$G=YQ†B8¶\Ãrı_f\í\Ú5(Š‹etwu`Z:’,¡h\àbaY9L\Ë \É\à\â`;6¦i\Ëeyş©gòuu=«\è\ßı!Ã‰8C\ÃCÔ¯i`k“Ø¾_\á‘\Ä\àõ\ßÕ¶m’\ÃI9üp²™Šúÿ\Ú;³\æ:\ë\0³\İ}#V\0R-Š\"­\ÕV\â(å’­=Vy)9J¹’\Ê[R•—<\å!OyJ\åÄ®¸*Š¥bl+q”h‹%.¢Ä;p/€»\Ï\ÜYò\Ğİ—ƒ \0IP\Ô|U,b\æöôôôôœ3súœ\Ó:;\Æû\ï\İr\'W}c\Z&/¼ü\åòWxñ\Ö\ê5š­&\ç\Ğñ—˜™fvvš…ùÙ®\Ëtyq‰ÿ<ñ.}~¾\Û^_†¨>2M“\år…‰ñ\ë\ä\n9zû{h5\êLM\İ`~n†V»I\Çu¸yc‚©©¬T\ÊbñŒÀ\ç÷}\Äo\Ş~‡#ŒRrA \çIMƒ‘±Q®^¹L6—\Å\Ğ5¬„X5Á45S\Ã4\r4= I¢i>†`·\Û\Ôj«ü\æ\í\\ø|÷÷T…\Ìj\0hš\Æ\Ì\Ô4S7n2<ºŸD\ÒIıt+apõ\ê\æ\ç\çÀ”B¤\Õj£\é\Z‡ƒ\'¿õ4Kó‹]›¹!W–ıºV(¾\ï‘J§yñ•\×ø\Ù_ü%…R	\Ûv(‹<üğaùö³¼ş£Ÿpô\Øq²ù,®Û¡R® ÉœU¬QD\ë·\î4J\0_¿vK\ç/¢\é\Z¥R	\Ã\Ôñ}F½F½Y\Çõ\\\ZM1	{\îó³ü÷»\ïrö\äIjò\Ë%^_\ét†¿ı»¿\'À\ã\æ\Í‹yt4Æ¯^•\Ù\ÖNôêºi´m›Ÿ¾ù§\îb~~z½\Î\ã\ß|’V³Á•+—I$\ÂñÀuù\Éo\ÍeY\\ZBö\r\rq\æ\ä)›\"mñš¦u\ã\æò…?üñO¨,—©\ÖV©”+¼ú\'?&‘Hp\åòE<O˜ET_¸\Ço¾‰ašL\Ï\Ì\àº.\à³Ó§»	8\Õ]\Ñ\äw±P\ä\ÅW_£^¯\Òjµ˜Ÿ›\ãGoüÛ¶™¿\Öm‹ºfõ\Ú\í6¾8Ge©LÛ±\É\nÂœ\Şh\áË¹*Ç±±\ãW¯ğ_¿}—Kg\Ï\Ñhˆ¥nõ§hS§\Ó!\ÉğÿøO|v\æ4f?ğñü®\ç\ât:®\ë¶ñ=›fK\Äß¸®C­V£V«\Ñh4\àÄ¯Ş–W)^\"ş\ê¯ÿ†¡ı\Ã|şùgdrYú{øøƒ÷ºıpK\Õh2•T.—ã‰§Ÿ\æŸû#ª\Õ*³³³<ü\Ãôööq\æ\ÔÉ®©0•Jñ\İ\ç¿Ïƒ˜™…¾O£Qge¥‚\İn\Òl\Öi4j8®M§c\ãû–\Ëe>~ÿC~÷\ëw™›š‰ô±\n\Zû\rÃ V­rñ‹ó,—+ôöõ`Z®\çR«U©\×kxp°\í/\\\àÄ¿ıŠ‹ŸŸ\ë\ŞCM\ÓH§\ÓtB«\èš\Î\å‹¿t…k—.c·[x^\Ó2q›v«‰Ó±\Ñô\0\Ï\ïP«­R¯\Õ8sò\'\Şz›¹é³\ÜKv\í_uªz˜4M\ã¹\çŸ\ã\Ñ\ã\Ç\ÅÀ\n,+I½\Ù ™H3:z€\Òj\Ú4›M\ìv]¦n¹ğ\Åyşı\í·˜œyÍ¾N¤3Z\Í&–e\Ñq]^|ùU^yıuñ.…´Jñ344D»İ¦\Ùlrúô)ª\Õe¦\ã8œş\ä$\'\Şy\'Z}—»9P5ù5 \Ì\\V\"AOo\Åb	\İy\ØlÇ¡^­±¸°\ØÍ§¼\Ò½\è\ï\ã¡C‡™››&™Jø>¥=%Îœ<I»Õ¾õU$\íøŠ==½}\ì\Õ\êj\×\ì¡i:={z8}ê“®9­¯¯Ÿ\ã?Á\Ü\Ü,¦i\áy.\Ùl–…\Å&\ÇÇ±	9\ÏeYš®³o\ß\Ã##T*\å\Ğüˆ\Æğğ0§O}\Â\Ò\âb·š®S*•xô\èQ–+\ËX–…\Óq\è\é\ée~nkW¯\È\æ‹gD7|\Ï\ã\È\Ñc”zöP­VI&-ì¶ƒ\ç{pú\ÓOX®ˆ\0av\r?\ï£\Ë{`˜&ƒûö’\Éf°¬\ãP[­²\\©\ày\îš\ÜeJğŠ^¼\å9iY‡9‚e™ò×µbF\İ+]\×	|Ë²\Är2\İQ*•\âÈ£Gù\å\Ï\Ş\rT\Ù?\Ê\áG0=3E:•\Æ —\Ísù\â9–+\å\î‰:i\nKK\"‘\à\Éo=C­VGÒ™«++Œrö\Ì)ª««t:\Ã\à\Ù?ø«\Õ	K*Õ´Rõ\á¸#:\Ç2¨\Õfqq\"\ëš)º\áØ²Tÿ¨¯óD\"m\Ûôõ÷Q(\Èf³hšXü®V­±\\Y¦ãˆœ„k,; ´§DqO‰t&¦k¾ˆ£ª®TY]YÁ±\×.I¢\Æ\Õn°k\Ê„@HX\â\Æ+†F†ø\î‹Ï³§§— ğ\ä’\Ğ\í¶C>Wdß¾aŠ\Å\çc·;¤\ÓiL\Ó$•Jqö\Ì)şõ_~Á\ä\Äx÷¡·dZ—Û½™÷;\ÊNş\ÂK/óg?ûsR¹\Õj•¶\\[\Ì\Í\Î\Òlµh·\ÛØ¶M\"i\n³g\às\á\ÜyNz’F½\Ş}¨\ÔÂ½˜Z(‘eô¼j[	\Ğ\èoºô\ÌR_Æ›¿Ô¹\ÂöyU\Ï-¥r\ëüjŒ)¡Ÿ”sj|«:\Âe\Ãunô›\Â4-|­P\Òä¼ŸR°j\ÎÆ“óbAt>PÔ•Z\èkXü$âŒm2MS˜š¢u„@(u™%]l®=oô~mFø\Úö\îeaN¸š\ë\ÒS\ÑWóA†HI¥úY\Õ\ÎÚ±\Ñu\é:\íÉ—_š\Î\ÔÄ¾*\ã\Ë»\ê|[¡\ÆB÷\ÙY³PcwD\Ë-±OÑ±k\ë\î\á]Bô§pR\Ú\rvWE:_\Ó5|\Ï\' \à\Û\ßy–cO<N&—À¶m@\Çu]2\éƒƒû\È\çø¸ˆÒ=¤“)t]\ã\ã?\à\Ä\Ûoqñ\Ây4ùª·õYş•@CWµ7‘H\àt: \í\ç\ÉTŠ—_ûo¼ù&\ÉTŠZµJ\Çui·\Û8ƒ\ã8\Ô\ëu*\ËK]7d\ß÷\ÅY³Ayi‰ÿ\ç}\æ\æ\×Œ\à;„¬EÓ„Ç—¦–+*‚\è®n\İ0 üæ½‘@\Ş&jl†ETX!…š\Ö][F™\0£Qõ©•_­Ò´,Æ¶ *¤4ùB \Æ\ïšk‘\Ê$,T£Wı\ë~¢\Z¦ıõ+kZ\È\Ëo]Go.0\ÂÁ±a[\ë\Ğ\Äù\Õõ©Œ\ä\êº\Ã}.Š¯ARõ™2RumÔ–\èø0C^s\á\Ò\ÑQ¸ö?Ù—\İRk=I\×\'­ºµv•.\Ó_…\ËG\Ût7Ñ”RWm\ê=\"\Ü{»\ÆF$ò…<O}û>qC\Î	\ï \á\Æ\Ú\ß?À\à\à \ÙL\rƒ¤• ™LR(Y\\˜ç—¿øgşã·¿¦ºº\"\í\È\â|®\ë®\Ô_	4cÇóÂ‹/ó\Ç\ßû¹\\f³‰\ã8t:lÛ¦R©P)—i´\ê4\Z\ra	Dd}2™dqa÷÷×¯^\ëö}ø\á¿g\Âf£¯;6ˆ›J	)Ü¾L˜\îˆp=Œ\Ó5l§L”hû\Â\ÇG\Û\êğĞ¡BØ„TVğğ¾\È6‘>\î²Á\Î\èuo³İš†\\ö\î–\0W\ÊU“&<Q\î:\'EÛªö)¢\ãg[l\Õ:ùR	\ÑÁ*ÿ¿Uuw’\èe\Ş\ËsG„û–\\!\ÏS\ßzšGÁL¦H$4›M|O(­L&\Ç\Ğ\Ğc£c\äòyLÓ„@2™,µ•UNü”w}‚³Ÿ¦\İj®™k\Øm6RÆ¨‡P\Ú\ÂG\Ç\Æø\îó\ß\ç?ü!ûG\Çh4\êx¾˜K1ƒf³\Î\Ì\Ì\Ó\ÓÓ¬®®`Z:+\n\rÃ Q¯óÉ‡sN.\Õ½ö\Ş:¿ölro\ÂtC¶+Ğ¢ı>\äNŞŠn½\á”Zr\×NÎ£„ux[½–\í²nÚ”@I±/©\äK~‚H»·s\ÏÖ°k¾\Ş!]ÿ»\Ö#\Ût›¶]´û£\Û#_,pä±£|ó™§D‚\ÇD·#ır=d\"\Å\Ğğ0cc£ôõ\r\Éd\Ğ5i¾@|Y-/¯ò\Å\ÙÓœúô9ù\É\ÇLİ¼±¡\0~\ÒG\ËD··\"ªp6ª[\Óó„G\ÜÃ‡…÷\Û/½\Â\ØÁƒİ˜\Ï\í`&E€g­Vcrr’\É\É\ë\Ôj54åªŠ‡\ï\n“\ä\äõ\ëLOp\éÜ­411\ÛdS\á¤úq³ß·Iô~„«û:İª\Û\í\Æu}ür{³ú\×õÿf7c]v‡”_r\İÈ¦k±2\Ú1\Êş¯\æ=ş\ß|òI²¹,V\"O€\ç\İ5vúúú;È¡C“\Ë0$\Zm\Û_O*•baa–?x/Î\áÒ…ó\Ì\ÎÎ !<f)Š„xTÁlF\Ô¬ù2<2Ê‘£\Ç8üG8ò\è£ôöa†ôr\Ò1\äÊ“\Õ\ê\n333Œ3??/\"¬5\r+a \"ûr³\Ñdòúu.»À\Â\Ü¶ôğ\êsƒ\ë‰Ù€u÷8\Úo\Ñ\ß#D‹¯#*Coy\ì\Ä\İ\Øe\Ç}²U\Å\Ñşßª¼D¦„ù½b\İ\é¶\ÙŞ¨\î²nÇ®q+£\rZ§”\ÒZp\à\à>|ˆ\ÑC\É\n]\×u©\×\ë$¬{÷3<´Ÿ‘ñÅ”\Íf\Ñ‘£\Ñhtt§Ó¡R^\âÆI¦nL0qı\Zó³\Ôk5\æ©Õª´\Ú\í\îr\Ûèœ`\Îd2\äryú\ÜKo_??ñ:D¡PÄ”y\Í\ÃÀ²4qµF¹¹&&&˜¥V‡\İ–F³\Ş\à÷}\ÌÄµq\Z22©ø\î\Ù\\\ĞE43|ôo!¢\Å\×†¡¿·<öb‹n\ì²\ã>Ùª\âhÿoU^+£;\Î\âş«…&½mL\Ë\äÀC\ÙpŒ¡\áarùœP\\šp}m·<O·\íÛ·‘‘ıô÷\r\Ò\ßÛ‡aXò+G8H¾põ\å\æ\ê\ãº.­V‹zµ\Êôô•\å\nP­Vñ±v=2\ØÎ²X	S7\é\é\íe\ß\Ğ^²¹¦n’Le„÷U ×”c†a¦ø8N›\å•2­V“\É×™ŸŸ§\\.\ãºb~(™Lvcl’\É$Ë•\n\×._\åúµk\ÌLM%¦\É$\år\Æ1·‹|Š£Bg3³È‰\nCµû+ÿh\Şe6•®¶ºO\Ñ\ã·*!:.n—W³\ÃvnÊO|\×øJx]\Æ i\"jYf¼M¥SŒŒ0ö\ĞCŒ\ØO&›E\×EPe»İ–\nG(Ÿ|6G±X¤X,\Ñ\×\×ÇR/¥R‰L&C2™^\'s|_(e\êò\Ù\Ü\ä¥\ÌbºfŠ¶\ZÒ´\ç˜jµZ\Ô\ëuª\Õ–——™Ÿ™¦²R¦\İn\à\áº\ÙlVP*G„Fƒ\É\ë”™¾q“¹Ù¹5“Ò–i­w¹Mbet+£;ÃO|\×x G¼\Úó\é`xÿ=}}\í\"›\Ï2\Å\í\àº\î\Z\á­\ë:¹Bb¡D>_\ÂJŠT0©TŠT2M2™k1©•:•RD˜\î\\\×Å•1M®\ë\â8:÷\Ójµh5\Z45\Z\Í&¶mc\Û6AwH°–!\Ìo \',/-1usŠ©‰\Ì\Î\Ì\àvD›f(	\íf\Ê1\æ6ˆ>ówL	)¢÷*\\ô·˜\rnHd;J´|”\èñ[•°Se´\Ã\â\ë\Ùaû¶\äÿİ ;\Æ­Œ\Ê\ÑÀ\ë\ÅKEzú{\é\ìgÏ=}=d²Y\éµ*‚\Ğ\\\ß)U¼[.ºš®A°v,_ƒ\è²PJÁ­/¨0	S(/eb04±F¡\éTW«\Ì\ÏÎ±\\©05y“Õ•jµ:\Èô/D_ú2R<z˜;@ôÙ•\Ñ.\íÿ­ú(Z>Jôø­\ÊGˆ•\Ñ\ãWFJmF —\ì\ÍòKŠ¥\Ù|–B±@ÿ ø*JŠ´.šü\n‚\0\İãœk\nB£\ê|LyŒr’p]\ß\í\Ğn·\é8\ê\ÕË•\n•¥2µ•*õªH¹m¢—\Äò,&&\æ«\Ç¯ŒÂ‚yó¥\Ş\Ö{\Æi2\ê[—ùİ¬d‚d*I2™\"‘L`˜&†¡£›r>(¤p|\é4ø>\ë\n\í`·m\Û\Æn;8}gz~óKÜ‰s\Ä\Ä\Ä\Ä\Üe|es\ßóõ[ü\'&&&&\æ¾#VF11111»N¬ŒbbbbbvX\Å\Ä\Ä\Ä\Ä\ì:±2Š‰‰‰‰\Ùube³\ë\Ä\Ê(&&&&f\×ù?I¢}\Ö0\Ù^\í\0\0\0\0IEND®B`‚'),(2,'La Nana','la nana s.a-','12312312d','correo@ejemplo','+5412313464613','Montevideo 14113',1,'2025-12-15 20:47:21',_binary '‰PNG\r\n\Z\n\0\0\0\rIHDR\0\0£\0\0\0]\0\0\0z	)\0\0\0sRGB\0®\Î\é\0\0\0gAMA\0\0±üa\0\0\0	pHYs\0\0Á\0\0Á¸‘k\í\0\0‡iTXtXML:com.adobe.xmp\0\0\0\0\0<?xpacket begin=\'ï»¿\' id=\'W5M0MpCehiHzreSzNTczkc9d\'?>\r\n<x:xmpmeta xmlns:x=\"adobe:ns:meta/\"><rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"><rdf:Description rdf:about=\"uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b\" xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\"><tiff:Orientation>1</tiff:Orientation></rdf:Description></rdf:RDF></x:xmpmeta>\r\n<?xpacket end=\'w\'?>,”˜\0\0“IDATx^\ìwœeõÿ\ß\Ón\ßŞ³›R\èMª (½‰ \âW±\0ŠX(*vQŠ*ŠtDz\ïz\r¤÷¾\Ù\Íf{\ßÛ§ÿşxf\î\Ş\İlBÀ@\Ğ_>yMöŞ¹÷\Î<ó”ó9\ç<\ç9\ÔS7\Ée7vc7vc7vcB~b7vc7vc7v\ã“\Æn2Ú\İØ\İØ]\éÿg7]E\ë&dYF’$L\ËB\ÊûLVY\Æqq¸.Š,\n‡\ÑdYFQT\"‘²¬ (\n\0®\ë`š&†a`[–ebY¦i’\Ífs\×ô\Ñ];1\ï®P\ŞR?\ä}>\\¤¼Bº.ô\Ô\rû}ó\Æ!\ï\İ!Oµó1üş»±»ñ\áP\Ö,\Æ|O\İ\Ä!¯wş÷w&vô\Ş;ÿódT\ŞR,Ë¨ª\n€ëº˜¦	@(\Æql$I\"«\ëPQYEIY9U\Õ5—RY]Kyy9U5\å—\nGÀ•‘dY\éjÏ±MôlÇ±I¥Rtuô\Ñ\Ù\ÑI_/ı½´¶l¡·§›®\Îz{{°-+÷[Y–q]\×u‘òYÈƒ»{Kˆ\Äÿ[ÿngbWu\Ü\İØÿŒD>\ÃÏ•5\×y=ü³]5¦ÿ\çÉˆ<B’$	I’°,‹\êšQŒŸ8‘ñ\'2n\Âöš1ƒ\Â\âa)\Z¦iSXPŒ,+\Ş\ï@’]dI\ïeŸ |+g\Ğ\Úñ!\n¦i\"\Ë2’£\à8¶mcš&Š*“\Íd°l›T2A}ı6\Õo qS=-[6\ÓÔ´Ç¶\Ğu\×cEQPU\×#W\Ë4qœÁf”¤m\Õ\ÎÆ®ê¸»±ÿ\È\'“m\ÌH\çG:·³°«\ÆôÿdT\Ù\ÖÀ\ä=¦0~\â$ö5‹9û\îKÍ¨Z’\éªªPZN\ÈK\Èèº®›˜†…a¤\ÒiÒ©™l\Z\Ã0pl\×„b;6¶c\ç\ÈB’$YF•Åµµ@MÓˆ„cD\Ã¢‘¡pUU\Ã8°~\Ç\×ö\\ƒ–eN¥X·z7®gù\Ò\ÅlØ°d\"eY9kI\Ó4\ì\Ã4†>–\İUw7v\ãƒ\ä’?x¥!.<v“\Ñª\Ú)*.aú^38\ì3G0e\Útj\ëF\ãJ\Âõsn;U“\Éd2$qú\è\ï\ïg ¿—¾ş~ñ8©t\ZÇ¶±\'G6b¾HA’=wØˆfˆ°”Œ¬N \È\ÍÉ²L B\Ó44-HYi%…%R^^Fqq	\ápI’r\î¹d2‰iš’\É$õ\ëÖ±pÁ{,Y¼µkV!\ËW>\ßò\Ã#EFp\ç\å[Nÿ©µ«:\în\ì\Æÿ\n¶M(şÀüx]\íÃ±«\ÆôÿU¶5PZV\Î!‡~†ı:„™³f\Å\0UY–\Ñ4\r€L&M[G]\íôôt\Ó\×\×G<ŞŸ\âŠ*\È)l\İl\ÛÆ¶m\\\Ë8Y\Ş\Ê‘$\×;\n$	›A\Èu][Â¶%,\ÓÅ¶\Å\ÜU8¦¨¨ˆ\ê\êj***(/¯¤¸¤„h4J6›.>\ÓÂ²,TE£¥¥™ù\ï½\Ë[o¼Ê’E±,16´,\Òòa‚ú¨\ØUw7v\ã	‚>hP\æ\Ë\"÷c#©]5¦ÿ\ëÉ¨¶»…Ã<š£9–³\ç‹Å°]\Û6ˆD\"(ŠŒ\å\Ø\Äûill¤±±‘2\é¦e„„•#I(Š‚\"\É8¶E<\'\Ó\İÕ\É “ÎN§Ñ³Y,\Ë\Â\Ğ\r/\ÈÀÁuÁ\ÅEB\ÌKùVI0$	…ƒ„#a\n)./#	SVVE @’…%\ä ˆ)›\Íb[.²,S^YÁ¨Qu\Ô\Õ\ÕQSUCQQ²,c[.©T\Ê+ƒD\ë–-¼ş\êË¼ô\Â34oi\Â0È³È‹\È\Û!2’>x|ìª»»ñ¿€¡VQş`\É\×şñ\Ïp\ìª1ı_KF3\Ü,§œv:\Ç~\î”–W€\'t\Ã\ÑŠ¢`\Ù­­-465\Ğ\Ö\ÖF{{«°&T5\çf\ÓTp\è »³‹ö–Vz»{\é\ï\í#™H\Ğ5j\Âğ\Ûş\Ç(o©Ï‘•ªªØ¶MQI1\Å%\ÅTTURR^FeMÁ@I–\0Ó²0\rˆDb\Ô\Ô\Ô0q\Â$jjj¨¨¨a\ä¦)\Çd¶r\Åú)^y\ét]BH\ì()ı“\ÑğÈ¤\İØ]…m“R>v[F+üu5¾p$O“w]aØ¶“« Æ\â„SNcÎœ}	xs?–mQPP@ ¤³³“úúz\Z\ë\é\í\ëÅ²U\Z2ÉŸJ¦\ØÒ¸™-›7\Ó\Ó\ÙEoO/nŞœ\ëº[­ÿù¸ONHP+À´-\Ê+\Ê)«(gôøñŒª«À¶\\E!•J\ãº‹0fô8&MšD]\İ@.JO’$Œl–şş~|ôA\ä!úûûrD\ì»œ|FrıÿDya-\Óÿ\n\Ê[\êq¯­óChwc\ç`{\ë\æòñI·O+F&£|mğ\ã!‘°«\ÆÀ§‚Œ|Y({®*_XÚ¶û\Şgû<\çı\ß7™2m/\Ç!Nƒ\ëEC¬_¿µ\ëV\Ó\Ú*, X,Š$¹¸\ØX–E\"gó¦\Z6n¢£µ•l&[¹°D\0À®ş\à•dÉ‹”G£Œ?–Qc\Ç0v\ìx,\ÛFQ\Äü—e\ÙH(Ä˜<y*&L ¢¢\×.<\Õ[œkf³<ñ\Ø#\Ü}\×mtu¶#\Ë\n®+\È\È_°kÙ¶g*\r»ªs~\Ü(ó\êz7}|\Ø2\Z.€$O9ıÿ©-¶¢\î¦\Û\í|iW\Õû.%£|m@’¼hEÁ²,EL\Ûko.ùñ¥\ì9}\ã`\Z(2¥¥¥˜¦\É{\ï¿Ë²e\ËH§\Óƒ\nc¸\Ø†\ë\Ú4l¬g\ãúõ4lÜ„¡\ë\àY?¾•\ä\æ-*õ¼A ú¤‘³Ù‹¬S5‚\ÂB¦NŸ\Æ\èqã¨¨¨FUUL\ÓÂ´-²E\Ñ\Øc=˜3g£F\"“ÊŠ:“$ŠJ<>À\ÓO>\Ê=ÿº\î.$IXşB`òH\ÙõˆiWuÎe\ÍõC\ÆpO\íÄ­\Èi7şsøuº#\âr$A$ıd5\r\rbÈ¯±=7\Ûùh{\ØUı—’‘Š\Ö\Ç\ÉYFš¦Q]S\Ëß»˜9û@II	¶-¦¸´€yó\æñ\Ş{\ïL¥¨ªªôB¦Ul\Ï\nZ·f5+—,#kr\0±†Hù	\Û\Æñ,ƒmC\Úe\rƒ—®I\Âuœ9H’„\ä\é„I“˜4e*Söœ†¬*¸.˜†M<>€\ëºÔª\ã\Øc¥®®t:K2™&¤P…Vzòn¾\é/9KÈ¹\î|}\ëYC­hİ„$ItÖŒ‡,¥\İø\Ï1’e´#º|N(y_ş_m“	‰.6ˆ9o\á%\Ê\'™\Í[\×\ä°\é\á]Eş»œŒü\ì¾•øöw/\æK\çœC Â¶m2z–h4J0`É’E¼;o\İ]]DP5Y’\ÈfR,š¿€å‹—¢g…¶v\Åm\İ~[\È\á\Ó<*\Û‰Wªaö~û1y=Ef\Ò\é4‰DSO±÷Ş³8ú¨\ÏQUYK&“A’d‚Á\0€Js\Ë&®¸ô\Ç,\\°€t*\åhûùóş‡\É\ÈGyK}n\0~Ò„TÑº	€p$Â¤‰“yµ\'‘g»\àŠ¹»\á=tW	Œ‹m‘‘¡ğh\ã\Ãı\ÛdW ²­!7\ær44ø\ß0Œ\\Gù\ØF5\îvU\ß\Ú\ådTÑº	\Çq\Ğ49ûÀşx=±\â\"Gd>°›\Ê\ÊJ675ñ\ÜóÏ°¹±1\ny‹I]—ù\ï¼Ã’…‹r¹\İ$Y*6”„v¼¥ş€?\àK\Ë\Ë\Ø\ï\àƒ\Ùc\Ê4l\Ë\"£§\Ñd—\î\înŠ‹*©®®%Œxn5‚!\Â\Â(\ÑX˜\Ç~˜{\ï¹\0\å £Ê¶†œ[V’¼E»\Şg’$\Ğ\â8®\'”…Š,\"\0\Å7/­\ßF­›¼\ÅÈ²H\É±\Ïa\Ø\0\Æb$\âq:ª\ÇA^P^=(Š\n¨Š‚\"óE>;\ä\n=Ô½9\Ò_\Ä#QûU%“Ns\âÉ§q\äQ\Çpé¾iZb!³\ëY* (\"!¯,‹Kÿ¼¨?‘7¯\Ç\çúù*<\r@6›ESUÚ«\Æ\æ}i\çÀ\ï—S§\Í`\êô½=v£jG³Ç”©hšFo_ı}}4mi¤e\Ëf6oªg\Ã\Ú\Õtw¶\Ã\Ä\ä~Àx¬lk\ÈÕ‘m;\"‰|—³¸f@Ó°E–i(¬~™?	³À`;\r.ÿsµ¦iX÷¹~˜\'Ã†bû2LUÅ¸’e%\çqrü1\á\ÉC(ø‹\æm[d‘ùÿ–Œüû£Ë¯\ä\Ô\Ó\ÏFUUt3‹\ëÚ„B!B!\ç\ÎeŞ»ï¢¨\n±X\×Dƒ!UK–ñ\Ş\Û\ïb\ZÆ\×T\r\Ã\ëlò!šb\Û{ø\íuüOüúS5Ë´„{n\Ìö=\è F­#9\Çq¢\ÑEÁĞ­\ÜÛöv\ê7®£¥¹#›E÷\Ò}’–\ÑE‡†#û\Å%EX–…\ë8Dc1R©$\áp$—)\Ğp\\—¶6®ûı¯inÜ”P~;Oöpñ\å?g\Ê\Ôi(\ÛrDG¬\än¸ñn\Şy\ã\r\î¹\ë™i‰z\0Y’—ªšQ\\|\Ù\Ï))+§¬¼\Ó0H§Ó„\Âa\\\é£\í\Â\"¹ \á`d2\È.”ñ\ì\ÓOp\×7“õ¬ú\á\Â8‰pÒ™gq\Ôg?Gqi†i\á\0\îp\ÂÍƒH\ä;XF‘4$¿V\\Ö®^Mı†µ¬Y±Œ\Å\Ş\ß)ı~Rº£ıŸ?\íK”WW‹‘%‰@08\Ä\Zr]\×K¿¥\Ó\Ñ\ÑÂ²…óy\é\é\ÇY:ÿ]ğ\ê!ŸCG–­›\è\Z5\Ó÷œÀÉ§ŸIuõ(dUÁ0m´@\Ó4q]›X$LSS/=ÿw½¿tøe>Êš\ë‘$Qü\à—ò–z9\î8N?û\\¢±\"\"\á(+\ä’mYhšF(bË–&ş}\×?h¬\ß\È2B¹\ß\æ?«¨¦|)5T\å‰”ò»\ÃQ\Ç~N9“ò²2\n‹J0¼z¶m›`(€¢Htvu2÷¹§xò‘‡aõûI\àc!£•´Xáª«o`ò”©†nè¨šBIImm\Í<ü\È#tvv‹Å$Áîªª\Ò\Ş\ÚÌ‚w\æ\Ñ\×Û‡cÛ¹6\Zt·l¡\ávœŒvÆ€ü$á“’\ïòT…\ÉS§°\ïû‹ÅˆD\"¤\Ói\Ú[\Ûhnj¢~c=\Âbş­ª½1gø\×ú8;dşõ+\Û\Ùk\Öş|\é¼opú\é§3O\n…ˆ§’¸®K0\Ä4²TUTr\Ë?o\æÁ»\ï¤aı\Êqøš¢(„\Âa‚±\"\ÎùÖ…œı¥/¡\Ãd3\0$Ed\ÓpE•)*,\à…§Ÿ\âÁ»\îd\á¼wr[ˆZô\É„\ëRS[Ç±\'ŸÁ—¿ú5ª*«\è\ë\ï\'£h\êG\Ú\Ì\ÏöTd\"¦†\îºıf~ü!r\í\è\Ã_“¦j\Zs:”\Ó\Ï>—/p2ñtw\Èı·_–\\–y\ï\ÇÁu,\Ò\é4’\ä²~\Í*\îºù&–ÎŸ‡n8\êzZh.«¥¢­\×q…Bq\Ìñ|\å\ëß¥´ºŠXY²ª (b}\Ş=m\Û\ÆqÂ‘º®c\Z:\ÑX’\Ú\Û\ÛË’w\ß\â–?ÿ¶–-Cˆy¤¾\é“QYK={\îµ7_8ù4.¸\è{ôÇ“ KÈ²L4\Z\å\ß\Í\ã\Ş\Ï\âù\ï}\à³}|2òŒöœ\â\æ»z÷œ±7\'œz\ç}\ã[du\Ó4±,“ÚšZ\î¼õ~\â!–.x\Çº\ÑK¾7\È\Ù\Û\' \áğ\Ë%I°\×\ìıùü‰§rşw¾C¼?\ãYñ%\Å<ú\à}<òÀ½,ÿ]5\ãsõ¸+°ıûP\Ş\"\Z\È\íUí”·\Ô\ç|\ä\0\'N¨\ã£n\ìX2z\İ4\Ğ4…²²\Şxó5n¹õ2™4±hS\Ï`™:®c1ÿ\í·y\å\Ù\è\íî¡³zİµ\é5qH\'\í©\ä5 (LO\í$zj\'‰\ï\æ\â;\ÂÕ“ü·ÁÎšñt\×N¤£zo÷\ë<õ\è\ãl\\·yo½Íÿ¼•§{œ…ó\Ğ\×Û›ûm>ù\×\ÚQ”5\×\ï\ĞQ\Ş2ø\Úuû†mYH®ÁÄ‰\ã0L\Ëu0\0-R€+$¡\ë6Lö\Ûÿ\0ö\Úkš\ç~ñ,/\Z\Òõ–”rì±Ÿ\ÃEÆ´l\Â\Ñb‚\áb-‚éª …0‡Œn 8–ª\ç.„œ:\ny­-L\Ûs2ªªa»±‚\"MÅ‘,e„CV·y8²Š­ˆ\Ã\nÑ½TQ’*100\àa¨š\ä8’,7´e0¦v²,#IP5I\ÆAE”ORHj´ ¨a\\%„«„p\ÔÀQ5\\EEV4´@ˆ¢\âRB\á{\î5‹\Ë~÷G\ÎøúùhªJ™\×NÛ‚a\Â%%\ÉDc…\\ş««ù\ÎÅ—1j\ÜJ\Ë\Ë	j\\\Ç\Z¹¡‹5m’’„¢ª\ÂR·\\T- \Üò¶ƒ¦j”••qÄ±\Çó÷{\çˆc¿ˆëº„\ÃaÈ›gË‡__=µÉ¦SÌœ9SX¹®‹ë€ƒD:¦¨¨€Ş6\ÆıVÊ¿„\èC‰ş>¦Í˜$\ËX®ƒ\n¢ƒ¤2I\Ê\Ê\é\ïi\Ç\İ\r¾ö‡ßE5Kôw·3s\æ^¦‰)ƒ%\ËXšŠ\î:Dba\â}½¹>?¼\ß}’\Ø\éd\ä²ŠV\áFr\ép|m¯¢u~0\×şù&L[øı\Ç!ÔˆD\Ã<ôğ¼ú\ê+„B!TUd\Ğ5ú{ûxş‰§Xµl9†i|`\Å	š\è\ÓÿŸ\Ø+ç•õ<\İ\ØAKy]¬>\á\ì,x2hˆ@ˆÉ©l×›—\É\êiR©‘\Â\\I¡¯·—ªª\Z>\âhA\Ãöxr=›\å3G\ç	i%·˜·¯¯C·p]°‘°\íÁp~E\×Øº/‰\ïøp\\—Ê²RA„’Œ›\ã-\É\áp\ÙhŠ$¡HBK—eE‘Éš†c!©Á@pğ\î[•g\ĞR+ˆPXP@2\Â2ML\Ã\Æ\Ğ-Ì¬¥\ÈH¸–kY8–c›¸•;/+¼m‹5x†)‚„\\I!Q3ª“¿üUN>û+\àE·„r/úKUU‚¡\×ÿıN8\ä*ª*	C˜†A6\ÇBS$¢‘M\Æ\Ğ\ÓØ–m\é\ÄbJJ¢hŠ¨Ÿ¬\ç.–e™p8LYE?ø\ÙoùüIg	¥AUG¬›\áı9\Z\Ò\ßßŸ{Nq˜\ÈxM¾s\ç\ÆöÿúıR–eb±‰dÇ±°¼úN§“C*ª*\Ö÷\áµwşsI#\rñ\É\ĞwCˆg\ÈGyp‰\Æ\"\ÄS\ÂJ4lÓ²\È\ê\"‰³¢\ÒÀğzü$±\ÓÉ¨²­¼\Ê-++@\×uR©Š¢PPPÀ…?ø!?øÑ¥¸Ò @),Œa\Ù&w\Üy6¬§´´MS\Èd2„\Âa6¬\Û\ÈO=COW7²,\ç¦¼u\ÛZÛÀ·˜v\ã\ã…\ë\Ç Œ\0Ç¶½õR&–\ã\ÔT\êW-\ço\×ş=Ş¡g\Èf³d2if\ÎŞ‡q&!Irnô©ª–…\Å%u\Üñ4\r]\Ïjlj\\\Í?où+‰d?®\ë\â˜B@›º4L\0rƒ#[\ÌX¸H.d2^~\ÂLS7p²YœlW\×Á0-Õ±P\Å6-Œœl\n3\'\Õ\×M_G+[6\Ó\ß\ÑAw\ÉTU™\äGB~\ÙtC\ÇqÒ©FV\Ç6Lñ\\¶‰ce±2q²‰^2ñ\\#‰k¤±³\É\Ü!™\\²„¦H(2YAjº®c\ÑB¾ö­‹˜<e\Ï!\î\Â|\Èş’\0I\âú\'c\ÆO¢  ‚m›X¶n¤Pd‡PP¦§«•\çy”;o»‰\ÛoıÿÛŸø\ç\Í\×ó—\Ïı÷ş“5«—\à˜)‚ªŠ\ì‚c\ÚØ¶C($‹ñÍ‹.\á˜ÏŸ„\ã;my\ÙEL\Ó\Ä0\Å<‰hóA²ø¸\á8.\"Ï¤?\'¦\ë:\éLZ\ä\íA6b6t¤Ï·u~\Û\ãOÁsò’,%\Æ\ØşÀü„±\Ó\çŒj:›0M“)S¦òö;\ï\Ò7\ĞÇ«¯¾Æ»\ï¾\Ë\Â8\é´\Ó9ñ¤\Ó@V0ƒ@ @,£££\İs¦iPTT„\éu Ë²X¿j5\Ë.‘L»8C\Âÿ(o©\'{>\ïÁh}|˜¾\ì\ËO†\áº.û\î·?Wş\á:Š*ªH\ëe¥¼÷\ÆK¼ôÒ‹\Ì9\è¾x\â)d’\\\Ë&›Iñøƒ÷r\ë\ßşŒ,+\Æ`Ş½³\Ï;Ÿ/}\í„£%b1\îºû6Z\Û\Û8\ç\ÜoRSU‡\å˜8†N8¨±|\Éû\Üsó?˜÷ö\Û(Š\Øô0\'ô¥¼1\ï•ùû¤|\Ìd‚E\àˆl‘@^xT2Am\İ(t=i\nSô\ï¦a\ã\"CtC§§§—d\"i;˜6¸Ã¨Šbl=\Å\ßÿ|\ã\È\Â_Ešôa‡Á~úŠK+È˜J H(¤¥u¯\Í}\\±\åˆeY ¨ÈŠ,h\ÕuQTp(L0\Za\ì\èqL™6\r	\Íûójš¦‘\è\ç\Õ\çŸ\âò»E”\åpTµ7bY\\r9\Ç~ş\Ê++1\rI•1\á\Í(,Šò\Ê\ë¯ğşû\ï\Ó\Ù\ÖBÇ–fz;;\ÅtI\"Z£ºnµc;a\Çõ9&LšJoO?®\ã\à86‘PSÏN%¸\è\ë\çĞ²e\è\çp\ìp¹ş¦R\\Z‚\Za»\àJ2Šk³r\Én¼\æ\ÌK\rfwù¨(\ÛFnC?Bxô˜1üå¶»(­¬YIM‹5\Ëq\Ã®b\ã†\r°•\"”§msl‰/ˆ14ø\×?—û–$QWWÇµ¿…Ú±°Q0m\áY\ĞX³t>7üñ*Ö¯]»\Ë\æŠ|\ìT2ª\ëi!›\ÍRYY\Å\İ÷\Ş\ÏG€é±²\ã8lÚ¼\\\Ë\Û—””\Ğ\Ò\Ü\Äİ\ëŠ\àIr\Éf³dõ4\Ë,b\Ã\êµ8Ş¤¼\ã8t\×N\ÌPø\ï6ø´cT\×B\á0‡z(ûÌ\Ã	\'Ä˜1cø\âg\é’%9\á\ï·\éğqD\Ş \É=’B\êº.û\î\0¿ø\ÃuDK\Ê\È6e¥¼óÊ³¬\\±”¬\ër\îW¿,Q%×¶\é\ìl\ã\Û\çA6“Á¶…‚¢inºû\êÆŒEUe\"±\ËV,á¥—#Špô±\'0q\Âè†mfi\nkW.\ã[n\æ\İ\Èh«òÿ¾ÿ!Jj\' †¢H8(®CH\r²zõ\n^xöQ}\à~\"Ñˆ¨ñÂ¶‡\ìÀ‹	‚C¢öL\Ód\Îûs\àÁûs\ã\ÕÂ±·OFŸ9\âH~xÙ¯ˆ!©l@’%Ò©\Ş}“›¯ÿ#ı}}\"„@’d„û(‹QTZ\Â\ÄiS˜µ\ïû\Ù±mQ\É\ËÖ‘I\'Y8\ï]~y\Ù\Å\ÛT\0/+\äW¿»Â’b‚Á\0º§¬hšJQQ=ôoV®\\\ÊòùiªonÎ¼#+\nm£\Ì<p?&NŸÁ\ÑG}\æHO\Ï\0–•% iHcÛ¼óú«üş\ÊKh«“»N>ö	¸üé¦¿SRZ²Š\í²Œ\ìØ¬]±\ä“#£\Ñc¸\á\Ö;ˆ—€,!I*H’c±~Õ²ÿŒ|\äYğ\Ã=qN¢¶®?ÿ\ã6Š*ªp%I\É‚š\Ì\Ú‹¹ñ\ê?|*\Èh§º\é²\Ù,’,s\Íu7RZR†,ƒ\íˆxŸLE!“M‘Í¦½ˆ¹\î¹÷_\Z\ápY†‰\Ï{Ÿõ«ÖˆµŠ’›\ï  °;\Õ›©lk\à³UE\\y\Ê\ç¹\ç¾ûYµvwı\ë.½\ìrfÏM&“\á†ş\Âô½DnÀ|I\ÊóW\ç¿\Î\ÇğsùcO’\ÈYÂ¶mƒ\ä \ë:­\Í[\èh\İ\Ìò¥()*ô\æ8l**«8\äğ#±moÿ)E\ás\'JYy®#\æH°L½?\î–º;;Ğ³Y\Ë\Æ6\rLC\Ç4²\à:C{~:¨¡2@^V$\×Æ²lC¸\Ç,\Ó@‘dšF8\"J	E*«“J¦È¤\ÓdÒ™\Üö#™Tšş>‘>\åz&Ã‚·\ß\á­\×\Ş™ˆ†A’$TU&“I“É¦H$È¤“X†NIA\éT\n\Ó4E92\âÈ¤Ó¤IR‰$ñşÚ›[X·|%o<û\"K/aÕŠU\r3«#\ÛÂ™ˆ\Ó\İ\ÓC$^ğ\\ò\ç|\í„#\"S~&“Á4\rC\'ó\ìsO³võr^\æyš6#\åe«W5EQ¼õ`b\Ê¯¿\Í\ê\ïó\ÒKÏ²rùbd,p,²\Ùma\é:3öÅ´½fbY\Û&Y’\\°L\Ç2pmq\Û1Å†˜#ôÏ‚mõu’,!I®p[Z¦¥cZFn\ìl\ï·\î6<n`;¦\èûz\ÇÌ‚-^K#ı`a§’Qw\íD.üş%Œ7\İ4ˆ\'R¤¼Ái¹ºe¢(\n–c‰†\è\ê\é\äş\ï#\á]\ítvv\"\É.½]lZ¿‘h4šÕµ€*Oxş·F¾}’(o©§ºc3cú\Ú\İ\Û:$º±ª½‘S&\ÕqÅ•W2o\áB^~\ã\r~÷‡?p\Ìq\ÇŠ„q‡T6C2“¦?>€¬©üõ¯7QQQ‘S0|ø]\Ú\ï\Ûù}|¤ş?]\×–†’\ë`duC§««ƒ-7±l\É\"\Ò\Ém’\ÕÓ˜¦Ág?1]eZ§y\ç–2P$—Õ«V\Ğ\Ñ\Ò\ÊÆ•«Áqqt\\\Û2p,\Û\ĞE˜s^AvD6¸®X+\âx“\â©dI‘\È\ê\ÂúÏ¹ô]a	‰Şµ]—XA!\ç_t	BY—sÚ²,Î›?üv#\Âõ\Ö\åÈ²„¡gQ%°KO\ã8&Ñ¨\ØT\Ê\æª¦¡j\ZZ €\ÉrÀœƒ©,¯ >Ğ‡m\éd\ÓI$D˜ö¨Q\Õh1G3<ªnô\ØñL6\rE•I&¤3Il\Û$\ÔX½vÖ®aŞ«o’I÷Ÿ‹˜Ë±,K¸|=e\Âu\çW-ZFGS#¼ƒ\"\Ûd3ql#‹‰\ã\Z„ùüOÀql*Z7‰(\Ía\år½\à¡Ü˜˜–mXzi;ó4®;\\i\ã`Û¦¢°LLS\Çq,1\ïù	A\Ë@vL\ÌL,\ÛH{.\İyŠ;µ6ª,\æøN¦»·—q\ã\Æ‹†(.Šô¹išF(¢pÏ¿ÿEs\Ëz{{\Ñ4…½g\Î\äŒ3N\å«_ı*W\\ùsn¼\å|\î\Ä˜<e\n\0­£\è¨\Z»µY»#¢»v\"\íUci*©A\×uB\á0ûx ]r	Ï¼ø\"·\Üqß½ğBÆ\ëº\"º\Ê00M\Ñfªª¢{õ©ª\Ê?o¹\r<a\êC\Êı·}Œ¤½	‘\Û@O%p\ĞT•¦úFzº:Y´`€‚ªJº\Î\Øñ(«¨B\Õ4<ô3DcdS)ôL\nE–xÿıyt´4\Ó\Ş\ÒB(ÀuLd\ÇB\ÊE–9H®p§ù\È/Vş£ø“\ë8H¶d›\à˜8¶\èg\Üø‰|÷\âó­‹~\Èÿ„o]x	ßº\è¾u\Ñù\Î÷\Âùıo|÷b®ø\Õˆ\Æ\n\ÑTu0W¢W!şû‚øC6“ÂµLd\Ç!¤Š!mÓ¢§§\'7_\äƒe6¶eå½f\Îa\Æô„4l:\"¹(²‹M\Ñ\Õ\ÙJg{{N\é$‰²¼\å{ÏœE0(‚ET\\\×ˆ™¡~\ÃZÚ¶4\Ò\ÕÑ‘{>Yò-P\ÇšwÑ¶m\Ö,Y\Æ@o7m-H®…\ãXdSI\ËÀ0³Œ;šP8Œ\â…\ão]cB°<¥Á1º\Ø)ù“‚\ë¸È’–‰d;`	‹\İ5Ü–5Ÿ\\\0\Û! \ÈØ†‚ƒedÀ\Ëy)öM\Ûõ\ØidTÕ±™Ÿşò7‹Fy~î‹¼ı\Ş|Z:º@Q‡\Ãƒ\Zµ£ªA†;ïºƒt:\É9_:‹]ò~÷»\ßq\á…r\ÄQ\Ç0u\Ï\éŒ?C?‚Ÿıú7<ò\Üs<ıò\Ëüø\Ç0SÙ¥wµó\Ó_[ô5\Ù\ê\Î&>?º’_ñ3\åu®ÿ\Û\ßù¿ó¿Í”i{QX\\ŠƒŒa[è–‰$¹¨ªŒ¦)*Áp€D?’$	„#T\×\Öñ£Ÿ\\J($Vû\È\ï\Ò; Só ,#\Û\Òq$²­\ã˜ª\Z ›\ÉÒº¹™¥K’\Í g\ãÈ²A,¦rÀ!\ã\Ø6G}ªl!I\Ñ0›6\Õ\Ó\×\Û\ÃÆµk\Ğ4Í³,\Ò\É^,=‰I\ã\è8\îv\Â|‡ !K YY\Ìt?z:N6\Ç4\Ótu4\ã¸&U5•Œ›0†²\ÊRFEİ¸:F¯£vl\r£\Ç\ÕR7®W2\è\ÌYv\Ş6)bi•,\ÉÁ±L°MôtCOaf3>sÄ‘L\Ûk3g\ï\Ã\ì}öc¯™³\Øk\ïYÌœ³3\ç\ì\Ã\Ê_>—ıôg\\ş\Ë_Hö \ë	$LL#…MĞ ¿¯‹\Ö\Ö&ñø\à}½=\Æ\0ö˜:Yrqm\İ\È\â:6†¥­¥\rkWç„¿\ã8\ÛLL<\\±\ìlm§¥©‘\ÆúDƒ\\\Óô\\ª.‰ñ~\nGL£# ¬M=“Á\Òu,]¤°2|T\ï%ù$	\Õq±3:v*“\Íb¦R˜©´—	\ã?ƒ¯\Ä}0\\l\ÃÀ1M\Ï;\àX†\Äù”\à?&£ò–z\á;>\ïÔ©¥··‹7\Ş~_|\Şò.¿ür~ô£ñ\Ë_ÿŠ\ëo¸‘‹\Ó\Õ\Õ\ÅYgÁ\Í7\ß\Ì)§\Ê^\Ó÷BUUúûûÑ½]IC¡……\Å• *\ZS¦Nã‡—]\Îc\Ï\Í\åÁ\ß\\É¹s¦3v ƒšÎ¦­\Üÿ¿£\Ûs_\Î\Şw?~÷\å\Óx\ä©g¸ó\ß÷ñ\Ío‡1c\ÇR]]C$.\'\ÛFQ”\\¾º@ @$!‰Q+¤¯¯®.±Õ„iŠ¢’$q\â\É\'³\ß\àº\î\Ğ9…\Z\Ã\àŠ45†ÁH\'°\Í¦iD\0hİ¼\İÈ°v\Í\n¢\Ñ ñx/\á°\ÆI§ŸÄ˜	\ãù\â‰_$\Ò\0‘‰cÉ’%ôvu\Ğ\×ÓƒP‹a™:X’7`™\"<z[IVÈ²Œk[H¶‹‰n¤8\à }9ö¸£\Ø{\æ4öœ6™\Ùsf0s\ïiÌœ5Y³§1sÖ\Ì\Ø{\n³fOcTm9Š*\ê=Ÿˆr\é\Æ[ÁEv]\×\Â2²X†\Ğú{û{X¾|9|\ïûüü×¿\å¿ıWü\ê·ü\êªkø\Í\Õ\×ñ\Ë\ß_Í•¿ÿ#?¸ürN<\ã4ö\Ú{o2™$\áp\0\ËÒ…û\ÈÖ±\ì,†™¦­½…†ú¸®›[S$y\Ñv\å-õ\Ä\n\n°m\Ã\Ìb\Ù¶i‘Mg\é\éî¤  Š©‹õBø‚su=\"U\Ò\é4¶e`\Z\" )PI$§”\\¡\Ê\àb\ã¸+\Ú\Üñ-Sÿ\n²\ã\à\Ú’\å Ù¶g•ÿæ‡ƒoM¾òñP¸ \ã¢q\è:F6ƒ‘\Íl¥\ìJü\Çd\Ô];‘\Â\â¾ó½\ï\Ó\Õ\İÍ“O=N{\çF«¡¼²„hAŒşø\0½½½\Ã!¶l\ÙÌ½÷\Ş\ÃSO>\Å_şrO>ñK–.A\×u\Ê\Ê\Ê(+)£´¸Œp8š\ëøªªb¹’ª-,à°£\æª?\ßÈ³o¼\Íe¿ş-{Ïó+\Åÿ@yK=£û\Úø\æÁûğ\ÒM\×s\Ë\İÿ\â\ë\ßú6S§O\'Z#\n\"«2Š¦wi4BAQŒ\â¢\nc\Ä\"zú™7ÿ}\îº÷_üü×¿\à²\Ë.\ã±G¥¨¤5 \å\\)¡P„\Ëz%±‚t=;88<7œ\Ë6\åüÖ\0lC\Ç4\'x#ŞœPo\í-­lÜ¸‘d\"\Ä\Øÿı¹\æ\Ï&\Z‰\Ğ\ÛÓƒcY4mn »«ƒ5+VzKJ‹Š12YL\Ó\Äö\Ö\å`\ì(,/‘d\Îõe˜™,©8\ÉşRñF&K&™\"•L’N$I$$“IRÉ¤ \Ç\Å\Èê¨ª˜ÀÿÈ\\\Ë\Ä$K8¦I8\à3Ÿ9\Ã0\È\êYR\é„X£•I‘L\ÅI¦\â¤S	á®²l$ªŠid…e\êt,cõ\ê\Õ°q\íZae\äñ¤\ëm€\Ğõ,ºÅµml/\È@•d\ÆÕC\Ï\ê92r\\\ß=\'\åuŒ¡Ä¿ˆ\\}\Õ•\èºN&“Áum=ƒiê”–ˆ¾12DI]K¸\è\\\Ëô\æl÷\ìú$ \Ç[\\l›Ø\ï6\İ:gæ‡…¯GD\Ãÿ\æCQ1¯\è¾bùi\ÂLF\0—\\z\Í\ÍMü\ë_w‚djôöö\Ó\ß§¼¼‚O8™oç»œu\ÖYl\Ş,¢j:»\ÚY½z5?ü07üù\Ïüô§?\åø÷\ßÿ\0+W\nAR^ZJII	¹¹Y–\Ñ4yWYU\Å)gœ\É\í<\ÄSs_\æ\ä3\Îd|²;·ğ¶¢uÓˆ©Cş—P\Ù\Ö@YK=‡ù\Î÷¾\Ï=?\Ê\åWş‚\Ùsö¡  €P(”³jG,.-))¡¬¤˜‚‚(‰D‚wŞ›\Ç-w\Ü\Â~|	—]v7\İt¯¼ü\n\Í\ÍÍ”””°¹©‰¥K—±m\×aù¥¥¥œÿ­\ï`Y@\0¶1>~fj\Ë«\Ô\ro~0B\Ó4\Ça\ãšuô÷÷\Ó\Ñ!ò¶µµ\Ñ\Û\Û\Ë>û\ìCss3™LEU\ÙT_O[K]\í^\æg ¤¤$G †Gv–—*fG¡\È2ŞŠşüy\×q´\ëbxój²¿y£\ë\ædY²­‰\å-wøO`Zº°J¼kB¡P.s½\È.!\æO¤¼C–ñ\İ\È\æ\æEP„\Ì\êÕ«Y¶l\æ½G| |WZ^}Ù¶\íˆL\ã`xkıúH`\èy‘c\Şÿƒ\İcdBPT•\â\âRŠKJ\Èd2¨ªJ6›\Í\ÍD£BQı Ø¶º»Bø:,Mgš\"ó#(B\Ã1\Ü2\Z\áŸ(Ş¦¥~¿µ½lŸ&ü\Çd´·¤Šj<òÈ¿©ª*õB<MÆÛƒ\ÓOÿ2\çóU¦OŸN8\â\Í\×\ß`ñ\âÅ”••\n…())aT]\r•\Õ(ªDKk+/½ô\"\×_?û\Ù\\wıõ¼ôò\\ºº;©(+¥¢¢‚hT„»’ƒ+‰”èªªR=z—\\öSn½û>¾ñ‹˜%‹\ç»şWI\éÀC\ãÚ¿ü«oügû&NšD,\Ãql$I¬÷(..¢¦¦šòòREbÃ†u\Üÿ\àü\ê×¿\à\'—şˆ\Şò.\\ˆmÛ”——S]]MEe……… È„¢\Ş|SDE)š\n²ˆŠ’$‰SN;1cÆ’\ÍfQÕ¼\ÃG\ÃÀ º—¦$ ‰IøP(D[s\ÉşZ›[0²:2\í­md³Y:::ƒtvv\Ò\×\ßOkÓ–A²\0Š\nQU\Õ=61#G;\nÛ±)))ÁõH\Ç0\á\î06n\Ü\ÈÆY»v-Ë—/g\íÚµ¬\\¹’5kÖ°v\ÍzÖ®^ÇªÕ«Y¼d	M›	ƒH^¿ı¨\\°aé™†p“Y‰‹M ¤¡)š*£j2Š*4t\×)qL#‹¡gĞ³i\\o1\×uq]X±b+W®¤~ıV/_¾•Àó‰`\Íê•´niB•Á¶‰¬øk•\nŠŠr\ßõÿnş½\\Ç¡°¨Ã°\ÈdR$“q\\\Ë\Æ\ÒMR©›6m\"NÿùVø¸\Éhø¼rF\Óı\Å\Ø	\åğ-£\á\ÃL\Ê[—Y–‡‘|š \\VXú«\á\'?®Mö±pş’456\á\Ø.\çœ{ü\"‘\á>q-4M\å\ÙgŸöRF\çø‡,‹\r\ßb±b±¦e\Ñ\Û\ÛÃ¢EY°`!.¤³«“P(HEE%\ÅEÈŠ‚e›8‹eš AAa!cÇ\ç°# ´´Y–hkmÁu]®Môqm²ŸKD¶\êO3\Ê[\ê¹&\Ñ\Ç5^™¯Mô\å\Ê=1\ÕË»ûÎ¤\ã¬\Ó9ú\Ø\ã;~<\Å\Å\Å\Äb1dYör¨©©¦0\Z¥³»“Å‹ñ\ì³\Ïò\ĞCñ\â\Ü\ç©ß´Û¶‰F£\Äb1/ š\Û\â\Üï¨¾€H&„B!&L˜(µ+„N$!ó\æ\ë¯![Ğ˜¯ô¸ù\ïk\ë\ê8ü\È#H§\Ó9\í:›\Í\Ò\Ó\Ó\Í\ÒE‹•5\Õ‰ˆ\í%\âñ=\İ\İhšÆºu\ë\èhk\ã\İ7\ŞÔ e™\ãO8Y–QU\ÛsÑ¹^Ê˜Ë–\Ñ\Ô\Ô4B\Ùó/şœ~\ÆÈŠB:\Æq·¬O&“¬X¶œ}õk×±rù\nV._\Î\ê+Yµb%Ë—,e\å²\å¬Z¾’–\æfÆŒÃ¢÷|8a ‰h4€q\ã\Çs\ĞÁ\Ç\Ë2qq\è\í\íaùòe$q\Ú\ÚZè§££\Ş\Şzzº±m‹ˆ²\ï~:¦··—Í›7³v\İZZ[Zx\ï\íwX³|%†i(\Ø|„£QŠ‹‹©¬¬À¶-l[,‚V…	&\Ğ\İ\Õ\Å\êU«ru»K?\'\ç\İğ;ß»	\Èd\Òhš†\ë8X¶E\"‘ µµ•ùó\Ş\ãû\ÚÈ®º[—\ã¿øE2™†—:\Éñ3…\Û6\ïÍ›\Ç7Œÿ\Ì*¸&\ÑÀ¥…¥C\Î_›\è\Ãu]Š‹K8\á„I§\Ó^]\Î:\Ãû\ïÍ£§§g\Èos\Ø¢“ü½‰ÿ\rcb}5’$QXX\È	\'D\Ê[†Ÿª\È+\Ïû\ï½GOw÷.—‹¬®|\0’‰$«ˆğfw–5\ËV2uòtÆ›J_’T*²D8a\éÒ¥tuu\n\Ä~2’#\âÿ]‡A_¼X¦#\Ë‰„¨«E$\"\Ö$½ò\êK\Üø—?s\ÕU¿\ç\Ö\Ûocõª•D£**\Ë(­(%\âº6ÁF8\Z\áˆc\á›\ßş.?½ò—xğ!¨ª:\ÄRú4»ñüd¦ş\ä¬$IL5œwÀ,.¾ü\nN<\íÆŒGYe9‘X„`8H$aT\İ(ªGU\ã\àò\Â\Ü¸\êÚ«¹ú\Ú?r×¿\îd\éò%H\n\Ô\ÔVSY]A$F\Ó\Ä<\ß1-\Ç\ÆÁERddUA’\\À!Ze\Éòed=mZV%Ô€8ó\Ùc;nü põ\ÅI¾˜òªoeùN\×\Ó\ë\×o ™H\Ğ\ŞŞiš$“Iúúz\Ğ*™LŠş>Ö¬\\™s?¤\Óip]B¡Š¢\ä\ÒK‰\Ã\È)E~?õ‘q¤	Ø²¹‰ukÖ²~\íZ\ê\×o`\Ã\ÚulX³–M6R¿n7±x\Ş^~\á%œÿ\ĞE‡\ç\êóŸ	’\É8MM\Ìÿ=–,^\È\Ûo½\Éü÷\ßc\é\âE¬[³šu\ëÖÍŠ´ºÉ½~\ã\×Xºd	\Ï?õÿû~\Z7n\Ö\rlÕˆş;I’\è\î\èD–!Nz}\ÈF\×3\èzY–ù\Ì\á‡oeí€Œ\å\à\Ã>Ã¨\ÚZR\é4¦i“\Éd°m›>oC¾ş>AÛƒ\íY\Úù‡\ëe\Óø$\àº–\ë`YÆ\ã£ô½|\ä»)\é|ğs9#,h\ÛÀ´t,\Û@\ÆÙ¡6ù$ğ“Qg\Íø\Ü\ëp$\ÊN:x<$»(ŠX).+\ëÖ­!\ZcZº7 \rd6oj ¹Q„:ƒeš8“K\éoY’\ä\n(..¤¸¸˜T:Áüù\ïq\Ó\ßÿ\Æ\ÕW_\Í\Ã?DS\ÓfJJŠ©UMQq1E……‡©=–S\Ïøÿ\èR:\æ³\Ş±ÿ!\â\å-õT\×\Ör\Ê\ÙgsñWp\è‘GQT\\LqQ¥ee”••1a\ÂjkkQU•w\ß}—¿ü\å/üò—WòÀ\Ğ\Ò\"\n—––RXXˆª	¿{ş@5M“¬—\0´¿¯\rk×‘ˆ\'rZªOV\Édœ7†±,UU\ÑuH$Â™_ú’ ©p\Çloù\Z¬?gD{G–el\ÛfÍŠUôöö’N§s÷W…ööv,\Ëb\íªU€\Ø\éWQD\æ\îh$‚$Ib±ª\ã-û#ø\Ë}m\Ò/\çğ÷®7±¯x»±JŞ¢V<Ÿ=^¹š\êÅœ\æH¤XÖŸ×»§O\Ì%%%|\î¸\Ïñ\Ö\ëoòüS\Ïñòós™û\Ì<ù\Ğc<t\Ïıôöt\Ñ\ĞXO  ‚\'l[l`yè¡Ÿ\á\Ô\ÓN£¯«Å›\ëò›\ßFB\ë–f²zš¾¾¾\Ü\\¢m\âhkka\ê´ir\ØgÀ{.ex›¸F~t\Ù\å†Aoo/¦\'|k\"•J±¥©I\ì\ä¼ø}6¿­ü1¿³\à#…maH\Ù\árHƒ\Ô\í÷‰ü#9a\È\ÙAøõ=¼>>”eş	`û-ºƒ¨ñ2#tØ¡h	Y±PdU‘(ˆE\él\ï`KK3ª§…;…¬©d3^~úE^~\æºû^»÷\Şy\í\r6­[G¼¿\Ë\Èb\ÛHª’\ã\â8ª*S\\T@yY©dœw\ßy‹¿ÿıoü\å/7ğæ›¯“É¦)­(£¦¦†²òj\n‹Ë‰\Ä\n)«ª\âs_8\Ë~ş>ÿ…\Ğ\\F‚]‰W\Ù\Ö@U{#5M9kmŸ \ËW¾y>ıøRf\í³ª¢QTTÄ¸q\ã7a&Œ£¬¬Œ5k\Öp\Ï=wsõ\Õ\à\îcıúµ\Äb1\Ê\ËKsQ[.\"Y§\ëgªv$Ë¥qSóß™\ÇK\Ï>\Ï#÷\Ü\ÇCwı›×Ÿ\Ëò…‹!¯#ûBvıúõØ¶¢MX\ÑTl\×\á\è\ÏM0\Äq„¦%I\ä\í\ä&Ì¶\Å\Z\à\Úd\ÒI\\\Ç\×F’„2\ä‚$IbÍŠ•X¦Egg§ T\İ ›J“ˆ³j\é2,S¤\ìEıáº¨š†,C&›\Æ0²\èFÓ´‘$%³}ˆp`W\İ4Hg3†‘¼\ã +bÁªœç›—=¡\á,Y–ÁØ²7÷\"\ç\0•G8¹=+¼¶p‡Œ—\rZ–edI%•Lù™\æm¹\àº.Ş/Bõ»»°lƒL&ƒn\Z\Ä\n˜¾\×,¾ıı‹q‘)Ÿˆü‰r¿<y™\Î-\Ëbù’\Ä\ãqO±10Œ,²ı‰8½ıü\êª?0c\æ,l/\Ø#\ì-V\rx²@U\Õ\Ü3\ãpıM7Q^UÎ†\r\ÄşM¶I&“B	htöt’H\'X±l9]yJğH$\Ó\Ôq]‰l\Ö ›50MW–Ğ¼`›º\Ö\\&’‘Ê¶†œ÷¤¦k­›rctT×–m\nÿK²,R]ùóŒ†G®®ÁP\Ùs\0šÿ\×[j¡ü\×şò?˜+.ÿ\Şx¬4\Ì\å,y\ãA\×u²Ù¬º\å:\È^\Î\Ã]\Z…;\É\Ë\à»\ïşû{}\ÖÅ²L²Ya®oØ°NL \"„Œk;h.t¶´c[¦!v@\ì\ë\éeİª5¼ú\Â\Ë\Ü{û\İ<p\ç¿yı…WX½l%}=½Ø‰&+•€¢¢ªb~¤¤¤„ò²2zûzyñ\Å¹õ\Örÿ}ÿ¦¾¡\ê\êJªjª)¯,¥°¸IU(,(\ä¸\ã¿ÀUW_\Ç\ç¿x’\×X»*<¼¢uSNó7ƒ\Ê\ê\Z~ÿ•³¸ü—¿f\æ>ûb{[,TWU1~\Ü8Æ‹¢(,\\¸n¸;î¸ƒ+V I±˜\Èx!IBh¨Şª~I’0\rƒÍ›\ZYô\î|~\äq\îşÇ­¼ò\Ìó,[°ˆ–\Í[H\'S9­©½µ\ÇÔœdY&\n±yófúûûQ\Óóƒ;CQq³\æ\Ì\Î\r\Ä!3#Œ\Úü\ÏıAfy\Ñn—\Ï\Ğ„\Â:‚>›Í²b\Ù2R©\é´pöôôH$X\ãYE®?¹›\'L­¼d½~™]\×E’ó	F(¨¼Ü‰ƒó\Z~¹R©\éLEQ†F\ä\ß\Ó\×\ì]Œüóş¹	“&ó\İ¿ˆ0hE–‹3œ—Ñ®N^jŸs‚Ğ«cİ,\Ë4\Ö7\Ò\Ô\ĞD¿\'\ÌÄ¼\ßÀÀ\0K–,\á\äS\Ïdö>û‹“>‰\æ‘G’®GH\ã°d\áb:::\èô2-X¶‹\r8lØ°\îNş~\Û\íœwş·G\"d½ˆB\Ç\ë›~\Ù\ÇOš\Ä}=Î¾\ìÏ‚H¥½m¼¶\ÌdRtww³l\ÑúD„ß¶\àh\Ã2ñ\ËjYºn\Ò\Ñ\ŞNu\ÇfDm\ë\Èo\'_¸û\×)+/\çW¿û]nÏ¬‘\à8b<g³Ù­\Ú Ã‹øôû‡\í\Íiùıc\Ä÷^™jF\Õrõu\Î\İsxöû^}Ø5$C\ì	\ç\çx\Ü\Õ\Ø)Y»+Z7‰Å¸\å\î1ª¶Y–q,±˜2	òÀ\Ğ\Ó\×M0¤¡H\à&!Yaî‹¯°nİ†\\ùBSò\Ö\å,$‰\â’bªFU3fü8jjG¡C8\àò;`~Ç³,‡’¢bÆŸ\ÈÄ‰‘e™ööº;»À.ee¥d\Òiy\à~^yi\î\àø÷°m\Û#.ª\ÛY¨\îØœ›T,*.á¬¯|…9Ë¶I¥R†A,cÔ¨jJJK\é\í\íe\ÙÒ¥446bš:H’ŸƒLÂ±\í\\Zû¦ac=\í-­lil\Âô„=yƒ\Öõ\ÜKg}8\Ş_<\ídjjk†\Ôq¢?Á\ÑGÍ¬Y³\è\ï\ï\'`šb»‚\İyÿ\ëßrQ>®\Ğ\èóGˆß¤’+¬\r\×\åÀƒ\æW¿ı%+W®Ìµ_0b\åò\Üy\ë¹òú\íQ\\ZÂ—¿ş5***(-*dË–-ÌŸ÷>o¾ö† 1\ãPXX\È]÷\İG[[ñxœ`@\Å2\Åó„\Ãa\î½\ç\Ş}û\á¶r\ìüI‘A\íR¶\Ñ>L:“¡³³“@@l®\È*j(Hc\Ãf\Z6lDQ51\ß\"Ë¨š†c\î­²Wş~5·\èø\Ø\Ï\r\ë\Öñ§?^•À.y\É\Ïò\Ü\\Gu4—üø\Ç,_¾M«\íµ»¢(üüò+H¥R¹úò!\Ë2±‚g|\åLj\ë\ê(((\Û[¸‰DŠ½g\Î&)\à\ä\Ï}}Â´¼\Üe[Yj¢Œ’$±\Ç\Ô)z\ÌaL˜0p («\ëb\Û.ºiQ7j4\'\í\íÀüy\ï±v\ÕJ²™4‘h„²Š\n¦MŸÎ˜q\ãH¥¬]³UÓ°lC<$cYúûûiin\âş;\ïûÀñ¸_\Ğ\åoÿü\ëÖ­#k¦±™` \ÌòÅ‹\é\î\êBA’ÁÛ±j$(’°¤2™4®\ë`›\"¿\æQŸı,£\êFq\ê\ß*?fyK=ªªR3jÿ¼\íVV­Z%´\æ)J¡P˜¥K–3ĞŸğ\î=‹\ÊÍ³¬|g.‡öª«ªøò™§‚\ç&w\\†\ï÷‹ºº\Ñ\Üz\ç\í¬_¿\Ã\Ì\ÈdRhšF$\ã¯ş+k×¬\Ù\åS;Œö\Ük/şy\×\İ9\ÍPr…Æ›L\'x\è\á…H’„ad‰‚˜™,ÿºó\ß$“©Áy•.Kƒ\ä28R’eTE¡jT5£Ç£¦®–òÊŠ\Üoü\ßº¼..\ÑHµµ£)++or\Û0\"\á0¥%¥”——Ó¸i»\áÏ¬[³\Z\×u	\ÅÀr<\Í\åƒÁGEU\Çf\Îş\ê\×8ñ\Ô\Ó…\Ãlnl¤··—H4JqqÁ`€T:MÃ¦M´wt \Ëb÷\\\×#\r\Å\Ûv\×%•J\Ñ\Ù\ÚNSC#m--t´·‹œ`®›+ÿp\ëoPø	!£x\æÿ¾\ìÏœ÷Ÿyšl*bò\ä\Éw\Üq¤R)¬¼õ:\ímmœ}ú™\Â-\à\Üm’‘8\íº.ûp\0¿¹\ê7,_¾¼\ì\ïE\Å\Å,_ºŒ;n¹]0\ÇÁõºˆ\ëºw\Â˜¾÷*JKhoo\ç®[\ï Oˆ[ä¹’\n\n¹û¾ûØ²e3ñxœ€\æ‘.\n\Ñh”G~˜\×_}\Í#£A\rxy\ïz\ìQR\é---Â½\ç8\Ğ\Ö\ÙAIi9û\î»/Ù¬§mº¸¢\Ş\Ş\ŞF¾ppl›\â\â\âñ\ëz‰\'{„{\ïº]\×\Ñ4\r\Ó\ÊJFß¹ğBÖ¬Yƒ¦	‹\ëºD\"L\Ã\àW¿ø%©dRQÁªšŠeZ\ì1m\nG{µµµ\à¹ı\\I\Æ4l>ú³\ÜyË­\Üw÷â¼—”57½1\æ·C À¶m\æ°v\å%¥¢O4l\ÛÆ²]\Ã\Âu%ªkj©¬¬$£*\Â}hY\âñ8]]]ˆ~\í¹“qA–\\ñ]\í<ù\à\ãl\\	û]nüû\ßØ°a‰t*—S’$ªªj(.*%Z\Ã7ò< [A’$p„ePT	S7ˆ\Ç\ã46\Ôsù%?\ØJ.ø[HL˜0›şy3Ë–-A[yc­´¬Œªª\Z´`Iş\è!şz6\ÍÚ•+¹\â\Ò!\å­\'r\Õ{=f\Ìşyûm¬[·TZŒ\Ë2‡\Ã\Äb…\Üt\ãM¬Y½úƒŒ\Ê[\ê9ùô3øÁ\"´EE!k­½¾~o¾õ:‘ˆo\Å@\Ö6\é\í\ë\ã±;\î\ÇöRÁûùL\ÂK\æ7Lkğ³$ITª¡¦¶–\Ò\ÊrÆŒK0¨ay‹<GT(¡´´”h4Š,û~~…X,–œ\ï¼ñw\ß~+\ÍMMH^N6\Ã0p\î\Ü`g\ì9‰o|û»TTV\Ò7\ĞOo_ıııC\Âo\Ç\é\ï›±ù¾e\Ë\\\'£i\Zı}ıtwv²iı\Z\ë\Èz›¤)ªØ·\Ä\'“\áƒğ2{\Z¸`To¡¶®Ó¾t&®\ëb:¶p¥\é‘H„\ã?I’\Èd„+\ÖqTE\åŒSNe _ìªº\r•\í\à\r}öİ—Ÿşâ§¬\\¹\Çsc³j\å*\îºõ!\Ü=—/ +ª*9\åKgPd6®\ßÀsO=›#_PjšF0\äGeõšU$½ù\×!¯>üo¾şº§Q\æm)1¼CJ=õ=½½lÙ²M„-V2\r _~\\°½ó\Ş/íŸ’„µ’I§©©®¡½¹•¿^ÿgA¼Ã´c\ÑOu\Ì1\\pÑ…,^¼xˆ6\Z‚\äğ‹+®´Œü\Ücy—S…Ã=†}ö›“³¬\\2\é,£\Øo¿ı9÷ô\ÓØ²¹QÌ¯¸x¡Ûƒ—A\Ë\ÖW><ô ö9h_JŠKPTQ?.\àºb¯o\Ûs„\å\ïC¥2C!\ïóA=\Ş?@ÿ@/O?ü$k5‘\èƒ\à[F«W¯&•TvE\Ê\"3„\"²°b‡[}ˆö–\0dUV0t\Ûs}*2\Å%B†|\ï\Û\ß\Şj\\ù©“&\ï±7ş\í¯,_¾\Ó\ÒÁsOú\Ïf\Û6¶-fs·\íÏ¤FcD#.¹\è\"\\Oa´¼vRÛ²3v,û\Ç\ßY»v-\éL\ÒsñZ(ŠFYy%ıó¬Yµj—“\ÑöŸt\Ñ];‘\êQ£À«\0\Ó4E£©2q‚P5\Şö\ĞÁ`T\"‰cu±‘,\âo\ŞS;	\×K=\ï8`ºy\Z}[K+‹\ç/\à\Õ\ç^\ä\Ñû`Á»\ï#9¢#išF8$\Z\r£t=M\"‘ \ïÇ´-\×E7úúú\È\ê:G}ö³üõ–\Ûø\ÖE\ß#\n¡\ë:Á`¼]xB|x\êú\áÈŸƒ\Z¾ğö X€;/ı!?¼ü§”UT\Ğ »§‹x<.:”ey\Ã‘HX¬­	‡E¾-¯.š77ñ\ì\ãOòğ=÷ò\ÜcO²v\åjL\Ã\Èe]°-‹\îÚ‰\Û\Ì\ß%?D;ø‚5k<‚Á Á`UU)((À²,º»»‰\Ç\ã\è^º–T*E<§¼¼<\×.\ÛD\ŞGù–•¿(ÕŸG°L‘v\ß\' <‹W–ez»{h\ØXiš,Z°(\×ğ$Ş¦u¶mc˜fnN\Êôv«µr\ë>,”ü´<ùJ\'\äA‰o!9\è\Ù¤ª„P„T\Â!•HXG$@\Ô;\"QqD#Å¥¨(ŠõŒp\Z^\âù\ÄkŸ˜óÿ:#²f\é]\×EU\ÔÁ•\ç\ê\\±x	ı}q\âñ8†·xW\Ó4:\Ú[iii\æ¢K~,,:]\Çñ6½ô\ëU´…¸”·\Öå½·\çñòó/\Ñ\Ù\ÕIoo/ÙŒ\È\î€k\ã:²Z@EQ \n *š¦\njh•l&…m›\èY1\ÉŞ¼e«V®\à\Ş\Ûî¡»³Û¯Š„\äeñ¶¡pPUX \Ë¡°J0¤l}e´ Œ„…ªA(¢+QŠµ’v\Ş‰#Á²Dÿ\Ëõ»¼~-{Á+ L88\Âıs\å\Øş¡i\n±˜\È\áHò£xÁ2~\ßö\ëÄ—¹\ÂjsZö\ì¡õI`§Qe[\Õ5U˜–NVO£¨˜Ÿ°lJŠŠ‰F£\"g4Ja(‚•\È\Ğ];1Wy~÷v½c¸+I|\ÇH®ƒ\í\Øxº7’7\ÈdOC\è\ëg\Ñû¸\å¯7ó\è½²lÁbúzQe…€&\"V|\ÌfÓ¤²i\Òz†T‚x*I\"•BR\Îüò9\Üv\ïıv\äQ9«(\n\å-õ(²\ïı\ß6zj\Å<UU{#®\'¼&eúùå™§qõ\r71s\Î~8Co}˜–A ¨¡j\"4X\ÓTYÁI¶kÑ²¹‰7\æ¾Ì¿o¹ƒ§~Œúµ\ë\Ñ3Y\á\Z\És«¸Û°„F‚D\Îgy\Â.JQ‹Q\\\\LYY\Å\Å\Å–SP\\”KjkšbU|:-\Ò\Â€ö*¹C\êMÓ„‚‰F‘$	\İKO\ã»Tó…Š\ë#Ø¶Mcı&º»º\éhk¤\à)*–e\å®+\Ë2\ÑhTO(TX0ş~Y¾€)\ØØ¿–$‰A¬ª*†eb\Ú^™5˜\ë\Ë\È#Sÿ\Üö\Ã41t#g\åø}mkˆö	G\"„\"aL[¬›Q\Z=\å\Ø—\çÆ”\äGz\ÈWüzººi¬¯§¨¤\Ã\î^$±~lÅŠexÈœx\Ú\éh@NˆvT\ÔGPc$Yb\íŠ5\ÜÇ½¬Z²’şş8†a\Éd\Ñ3:F\ÖÀ\Ğ\rt\ÃÀ²D˜¦I&“%™LbZ\Éd’d*Ió\æF\Ş~\í\r^zúE\İ\Øá¾ŒWH$’[\äiX\â0m\Ó20lÇµq)¶u8¶™‹ˆ´u#\Å2\Å\Ú2UU	‡‚#ô–A%Æ¶ŠKK\Ğ\rÓ²0½×–m£›(B^9öÈ‡Ÿ\è5w\ä¾8u•Ÿ\"\'Oó,kY–	„‚\Â)‰ı¿l\ï÷jP,vÿ4`§¸\é\ÊZ6ò\àQTT„\ãºB¡«V­ğ¢¯¼°UD%¼ø\ì‹<º®™ªö\Æ\\4Gw\í$o;ñ­wrõ\ÏûŸ\å¿ğ4¿ü2lb~\ì„q\Ì\Úw_¦N\ß\\±DVPddIh~3ªª\Úsq‰IÜ¥‹ó¿\\Og[\ëm\İqİ­&0óQ\ÓÙ„iY4Ãş\ç\ç{•\ãº6¦©“\Îf\è\ï\ï%•Nb\è:’1f[¸\Î$I\Æ,_²”\Õ\ËWŒ\'h¯\ZKe\Û\à\Î9\rw«zû ©Ç¼ ªb‚şªk¯¡¤´W\Ìğ\Ö\0…AE„F†˜\'	\Üs\ç]¼ô\âÜœb0¤s¹>\r\á\Ùû\Ì\áû—ü€x?[¶l\É	KM\Ó8\à€˜û\ÂK\Ü}Ç¤S\"\ÒÏ‡\ä¹O£±(½=½9\î\"¬I’(.)\á\'W\\AiY	k×®\Åu\í\Ü>B\reeeL™2…«~÷;\æ½ó\î`™ó\\O\0|\ã\Û\çs\Ğ!‡°h\Ñ\"Q\Å#m	oağ 5#y¿µ,au\å†\áp]Ë²©¬¨f §—k¯º¼k\ä~•\ç\Üÿ ƒ¸ø‡?¤½½•\Ö\ÖÖœ\'BQ$\Ò\é,s\æ\ìK&\æª\ßü†Ö–Á ˆ¨óª\ß•UU\\ÿ·¿\Ğ\Ü\ÖBÓ–-D#at\Ãs%9P\\TÊŒ3y÷7ø\ç\ßşÆ–\Ò\Z¿4yQ\Âü>W\ÙÖk§²ò2¦Íœ\Î\èñc).)d¨¦’%CVB*•Â¶,\ÚZ\Ú\Ä\áúMX¦—d$ö]Qß’$1iòd¾û½‹(,*d\Å\êU\È\êpºjÿ4¾\Å)I\n\"\ê\Òñ\ÖÁ•–”SYV\Å\ßşNn\Ûñò–z\Ñn®\Ë\Ôi{rşß¥°¸ˆ5kÖ (²+®){\×qqq? y«3¼€\îPû!\ZŠR^V\Î%}oˆ\ã\â\Øq\ãø\Ñe—EX¾|¹·ÿ”X›—1tö˜2‚X!7\\s\r+–.ÁıJ\ì\Î\ÆN!£Ê¶|òQÁ Y\Æ1…O¸««]\Ïaæ¸¨9\Üy\ë\í<\×\ÜKe[¶c#!\íP%”µl\Ò9ı±=BneE¢Q¦Í˜\Î!GN4Ã•d‚Á ¦iŠ¯(--¥vTµµcÉ¤…¥a˜Yy\à\îø\Ç\ß!O`û„0\ØÁ»k\'Šµ	5µ|÷{?fŸı\ÂušŠ¤¸´µµ\Ğ\ŞÙ†\áeK\ÎdRb+\Ó$N³esk–¯ä½¤MYóÆœf›¿\Ğx[ä½£\È\Í1\\\Õs&÷<p’$\ã*ş\Z\ZE–Ig9U±\Èw1=ú\Ğ#\Ì}şÅ‘\ÉÀ›kğ±\ïûSRZJ|\0UQ¼\ÚŒ*..\æõ—^ñ27½Z$\Z!J\ç\î%{ó>\Â5µ£\ë\ØcÏ©tvv‰D‘=-\Ñ\×\ìu]\'\Ò\Ñ\Ş\Îúu\ër‚Ä¿‹_ÊŠ\Ê\n:ôP\Ú\Ú\ÛQY‘1tƒP8”Wi[?©ÀPi’\Û\Ç\Æ#0\Ëg\ßk\Æ\ŞsÃµ\×‡\Éd2\àó·ON®Ë¾@¬ F2™\"ˆµ8–,ò2t“ÊªJV¯XA\ÃFO8\æ\İß¿Ö¨º:\æ°/­­­\\›ˆ\ëYX–ˆ\Î+..\æ\íW_cK©p\Ãç£¬¥\É\ë\ç\ÛCyK=%¥%•”+Œ\å¶)—e=›!\ém…\Ş\ÓÕ“\Û@\ÓW¶¶½g‘\×÷\İAÁ0y\ê&LDks3\ÑXt›­²£Û”ûA(\ã !±\Ç{0i\Âd~ñ³Ÿ	ò\Ûi\æœÙŒ›4‘\Æ\Æ‘DVr]\Äv\íœmCKš\ë…^t\Åğ¾\ïcÊ”©\ì¹\çüô\'—a{•>$Ib\ê´iŒ;–®Nb±A/€\à\Ø6\ÉTš\ê\êQ´µ¶°bñ\âÿ\r2ú\çİ·\n‡p]I¸Œ\È\Ûö\×4\Åa;\ÜyÇ<\Ù\Ğ1üR	e-õ\Û%£|øF,¨³™8y{\î½\ã\'NFŠAh\Ä	Ye\Ò\Ä)L\İs:\ÑHY=\ë\Út´µóû_^\É\êK‡\\;¿#\àu¯s\Ïû&gŸ{>Á`EP(Lc\ã&6Ö¯£··\ÕK¹\ãx¾ÿøÀ\0Ö¬eù\â\Å$\âññT¶5!¡…‘,£œ\0s]|\ìB\á0$„\ã\Ş\×\×C:& B–pp\\—\'}œ—_|)Œ¼‰\îÁ»l¥úX’$doÒ•<·’‹‹\ë\ä‡Hø\Zv\î¼$ˆl$WÛ‡A/†ÿ8QS;Š\ãÿw\İzG\î\\Nµ\És»±Á4ŠŸ\Å$Oa\Ê\'6¿>Šğ)o©ÿH¿\Û\Ù®Œ•·\Ô#{c{øxü¨È·8|”–•r\æ™gğ»§^r”ße\å\åœu\Î\ÙüıÆ¿‚?\'\èñøeÈ’C\ì\ì2*o­çš¿\\Gqq)²+´=Y–\ÑuX,–\ëü®·˜Or\\\î¾\ën\\³yø¥>1”·\Ô\ã\æYT\ãS\İ\Ì\Úw¦\ï½!oË²ˆ\'R—2c¯½™>}&z\Ö$›\Õ\ÉdtúQn¹\éÏ¨Š\"\Ö\"\äùn\ÇM˜\È¿ü=c\ÇN\ÂqŠ\nH¤Xºl!›77âº¶‹µ,LS§eK³\Èa¶~CnR_ñ„E~”\Ëp\Ëğ?…¯]z	\ä=\à‘\'§¬¬\Ãö·<+\Æ\Z\ê\é\é\é!¨Š^Eó\Ï<ù4o¼\êG§m«k\r%?<\ØÀ+ƒO6xa8ù)a†o\á\ì—?_€ø8ò…ûöHsg#ÿ-\ÛBó\Ö(\å+O^ıl\Ã\ëÃ‡ÿÜ¾\ìb;OÀº\âM\î·\Û\Â\Ğ>(”¿ñJ|’ğI@\ÓDŸtFˆJ\ÜH’˜ó‰{+H`\ÛN.©0#X‡¾\Ò+¾\ïõ\Ç!\ß\Ø	ğ\æ5/\àIœ\Z,“P(„\í-–õ?ó½\Üo\0\Ë[C\ÕQ=n\È\ï?)\ì2ªjo\ä~“1\ãÆ¢I\Z®7Ç©©©\Ée“\ÆuQ½5/÷\İ{O>ñ\Ô.\'\Ä[\à—£¶§™½f\Ïb\Ï\Ó()-dLË¡·§šš\Ñ\ì¿\ßÁŒ;l\Ö “I\Ñ\Û\İÊ¯~M\r\r8\í8œù\ås8ëœ¯D\Ä\ÂB\Ë`Ù²%¬^³‰\\Ë¦©¡‘%\Ñ\ÛÕ®\ëôÔL4;›„|ŒDF¾\Æ\n…x\è‰\'(..Æ°Aº\Şz–yóŞ¡··7·\ÈQQD¸\êS?\Éb/ºMl3w\á\Ü\ë¼aù\Âb¤Á•ƒ™a’i^øñ§Bxe\Ë+b~ùs™÷#\n\È°\Õs\çE¾‘_}Ã¿—I\Ú1÷ù®Àp«\È\Ç\Çi™H’„\ã:¹µ{>vU•µlDU\rö›\Ø_¼¿»J¹\Ø)dTÑº‰Ó¾|\'ODA,´\Ò4L&Ã¤I“3fŒ`n\×E•\Ä\Z–\'Ÿx’\Ûn½u—5\"y\Ö/ƒ¦‹[«:63u¯i\Ì\Ş_\n‹ŠÀ•\Édt²ºÁÔ©Ó˜±\×l\n\n\nQ\é\í\í\æ‘\î\áİ·_\ç’K\Î\Ä\É{Ô‚¸’KC\ã:V¯^E_o·^%“I\ÑX\ßÀ²\ÅK\è\î\è\Z‹7ño	ùó9\Ã\Û\Î\ÄöÈ¨¼¢’?ğ¡PH¸Y½}Œ\Â\á0\Ï<ó\Ùl–·çª\nûÁ{ ¡^¤7d\ÄĞ‹\ç#O\Ön>.4ıA6ü¼‡üA8ò7†!ÿK#\Ü~;tµ†o%º®˜ŸØª¾¶zl¡\Én·ˆ\Û ™\í\×\Éğ3\â»\Ò0a›\ïÿ0.ò¾·\ã\Ãaû¿.\æAK>ÿu>¶%Ç†\Ì\É~D\ä\ßmhŠVş\Üu\îóü¶ßº¸y\Øú\Ã]Õ;…Œ\Ê[\ê9\æøÏ²÷œ™`\rÍ‡4v\ìX:\è p]ER‘\\—÷ß›\Ï/®üù§\Ö\éû\Ä+\Ú\Z˜2}Of\ï·/e\åb\äd:ƒ\ä*Ì˜1‡Y{\ÏBUU\Èf³D#¢\Ñ(]m,Y¶€\Ö\Öf\n\n\Ã(’H ¹nõZ–/^J¯X%y~\\¿¾>iKq{d4mú^üı–Û$\ÉK¨(#+b\âÿ‰\'C–e\Ô\\¸³ˆ’ºóŸ·³!R*V¡\çÈˆ­lşù„¦œ¶·\ïü\×cky0ˆa=’–;r1\Û8\rR.€\"_°Š3CÅm	¨O‘ş#a›•#XW;[Gı~`Qv\ÃY*¿o¸C#BóñA·\ßU\í¹S\È\à\Ğb£ÿl.ôĞ\Z*,,\ä\ä“O¦?GvAFdzº»ù\ê9_¦©d0dôÓŒ²–z¦NŸ\Æ‡Lqq†a\Ñ\Õ\ÕMuu53÷\ÍØ±½¹›e\Ë±t\é\"A•‚h\×uY¿fK.¦¯·	±^)\ß\ï¿-\Í\ê\ã\ÆHd\äG²|\Ú\éüø\ÒË±<Rq%±\ÇÔ¦úz\æ\Î}p8,ˆ\Ê4Q5…L:Ã½·ß‹ˆ\Ê½\İ6†u¿¼·9Á\ë.tóµ\Õÿfø–€ÿ*ÿ\Ùÿ“\çÛ–0ˆ|eh+HÒˆ\Â\é\ÓFB>Êš=2\ÚJPo\ãùv¶Gdù\ä\èi›uı1´ÿx\È\İc„±7\Â)<Ú•\íº\Ó\ÈhBª›s¾õUKd=±ø\à¼ó\ÎC·L)¹¼u_ùòÙ¼—yöÓ‚\\tŸf˜¶÷^\Ì\Ù?ŠŠK1ƒd2\Í\Ô)\Ó5j½O2\'RPdØ´a‹\Ş[@}¤œr/¢\ã8Ÿ\Z‹px4\ä-\ìµ,‹Ÿı\âW|ş\Ä\Åd°\×İ‹Š\nx\ï½÷x÷·rÁ)¶e¡j\n­[Zx\â¡Gsó^\âÚ¹!¸\íQ?”FH&åŒ§º\ê\à‡ÿ}\Ø\Ê\Ê&@Fx®‘-£¡ş|\á7ü÷\â³a¿~a‚\ê“XÛš\Ú¶mı‡Øª¢?Ø…¾3\Ê2Bs@~qü&\Ò_å¯ƒú´c§‘Ñ˜ş6<\åóŒ®©ÁµD\'€ø@’\ã?=ö˜*ÖŠX\"¤TF\â\Î\Ûo\çÏ¾LyK=¡Pˆ\æ2‘\îÓ€ü€?2Æ·bdYFQUjG\×ñ™£\"	#I\n©TŠpX¤\ÎÙ°n-K\æ/bµv\åO\'„F9\Â\Zyğñ§(¯¨@7\rE´gaaŒ‡zˆ\Öö‘v\È\ÛLÛ®\ÃÛ¯¼ÁÊ¥\Ë\é©¾(y[\Ãik\Èù)x†Á÷‹\ç?gôHIÊ»×¶\"\ÓF‚o9şG\Ø\Æ3*ş\İy\É^ó±­ºñ±5g\ç½\â\Æùô\à“´\â·9\ç\â)-;Zö­¯\àŸÙ•µ#ğ¯°½ù³ü`Š!ÆŠ÷úÃ–\ßÿú\Ö\Ï3”Œ|ù»=«\×?\ï\îB\×\\>v\Z•·\Ô3\ëı\Ø\ï\àı‘,ö¨ª*ı	&OÌ©§Noo/\n^–a\Ûa``€/w\ì\'Ú¹wù\ZYY\ËFE²K£¢*“L$\Ø\ç€ı\Øs\Æt\n\n\n\è\ë\é\å\å\æ\Ò\ÙÖ±\ËB$?üÁ\âz\İÏª°\ïrÕµ\Ù_$BŠ{{»yø\á‡Q5\Ï‹—#M‚ûoÿM\Å\Â\í\ê×Ÿ\'2F<ùø!\à¹\ì#\ìXÀ6\Ãl\Ût„K.Š—\ï\ë\ÃüfD{H)\ïy¶õ,DF#a\ä+ù\Êô\ĞO·w}¿øø q[\Ö\\ŸSb>,/ó\ë\'\Ü†B!ƒ¢\×Køh\×	~]”µÔƒ;h\äÆ—÷Û©\Ş\ÆÖµ1”ˆò•¬mµg~û vü¤°\Ó\È`£Ÿ¿|*\á`Û´rñ\ï¶\åòÕ¯‡$IÈ²Šk\ÙT‘N\æâ‹¾\Ë›Ä‹Ÿf\á\íWY“û\ä5´\ì\í3f\ÜXV,[ş¦û§b ¸tç•·¼¥@ À\Ï~ı[8ò³8¸H²‹¤Hğö\Ûo2o\Ş<\nc\Ş^<¢Zš¶ğ\ÔC#\Ë2]£&PÖ²1o˜LF>ùÈ²‚,‹TC\0¡p„‰{LaT\İb±B´`\0S\×iokaKc-\ÍM¨Š‚¬(\è\Ù\ìG&$A*®›—ğô xiy|W\æüf{òüı~}©y\ëFş\ä“\ÇğR*y{‰q)\\\Ñ\ã\ÆOd\ÌøI”WV!I\í\ĞÖ²…\Ö\æ\Í4mn\È¦ÿü#	²‰©¦Ï˜Å¢ùó¶‘¬ôƒ1¼=	)¿W\r\"ÿY·ÿJ•{ÙºE¹?óù`$%K’e&Lš\Ìø‰{P\\R\æE!§inj¤©±\Ë\È\Ò\××;$h˜••wÂ¯3¿ŸN\Ûk&e•UŒª«\Ãvl2\é=]]4ondKS®Gú#µ\ã\'JF\0_=d/F©CrE‡—$‰şp‡v	dY& ‹ıx^~\éE~u\å\Ïi«3üRŸ*ˆ°Ñ¼\×ø~ô™\ášö§¡¡·?j\Ğ\íº.3f\Î\â\Ï½$	E©u!\rE•¹÷\Ş{ˆ\Ç\ã„\Ãb}‘,‰\Ğ\Òx–ù\éÁ®TÖ¼1o\àmMF¾P#OK?iN>\ë\\<\ä3T\×\Ô‰D‘‘¾\ÇqLSÇ¶mš›6óÖ«/óşÛ¯³~õ*‚Á\0=\İ=[‘‘}ÿü¸	“8\ç«_\'ZI\"\Ò\Û\ßÇ›/¿\Ì/\Ï\Ñò\Z\â’8öXf\Ï\ÙGdñ¶¤È³<7’ªjôtu\Ò\Ó\Ó\Å\ÆõkY0\ï\Ò\éT.\×Í“P~u—”pÌ±\Ç1{Î¾ \Èyu\'\åî‘¿\Æ\Ş4LdE¦¹i3\Ë/`ù\â…\Ş|­/¤s\×\ÈË¼ {©‘$I\æ\Ø\ãOäœ¯Ÿ\Ï{NGò¼\Zš¦‘N§°m\×vØ°n\rO=ú\0=øoğß¶”\×\å\Ê\ácr¦o¾ş!I<}\äb	¼GPeP5 \Ğ\ß\×Ë˜±£Y±t	º\æ:\Èeğ.}_\Õ\Ô\Öq\îyß ¢²\Ã4G\"d2–.^\Ì#÷ş+÷}q…¡5\â“Q8\á˜c?\ÇşHQa‰dYU\É\èY´PY–°,±•®g\éjï¤½µ…MÖ±f\ÕJq\å<\Íõm\ïŞ’÷y8!›\Í\nG8ù\Ìs8şä“©¬ªJ—¦—ªÇ¶,º»zXµl	\İ{7\Ë¿®\ëÈ²‚\ãˆóz\Ş62¦a1@0\ÈigË™_ù\Z£FFUUÔ€\ØO„Ò—I¤ikm\áW_æ—^`\Í\Ê%tÖŒgL;M\Å\Õ^©?Y\ìt2š°øüi\'\"\Ù\"\í¼\È\Şm#)*\çŸ>zF$Õ”Ym\Ë\à+\ç|™÷?\å>FšğÏ½\İ\Ê\å!†Ò§Á»-lEFÀ]ÿ¾Ÿ=§\ïMÿ@? \Èö[RRÄŠ•\Ëyşùg‰\Åb¨Š„m›¸@6‘\â\Û\î\Z¸0\\d\ä×Œÿ™o¸Àwp)_<õ,\nc\Ô\Ô\Ô`¹º®“H$p‡`0Heeªª’J¥h\ïhEvR‰^›;—k~ûğ5ş¼t(¾¬—<Bû\ÜI§óƒÿ„	\Æ\Ñ\Û\ßÇ«¯¼\ÎO/¾\0†i\ÛÃ”\é{ñ‡\ëodü\Ä\ÉÈª–t1HF~¿PdYjı½}ôôtñ·?_Ã«/=?HydäŸ›1s6¿»úOL˜:[ò¯;X«xı\ÍqTI$†5tt:I[k7^ó{\Ş{\ëu$?\Ğš³\ã8Ô\Ï\Ï“¦L¥¢¢Œp8ˆª¨477a[\ÑXŒ‚‚¢\Ñzzz\Èfu\ê×®\å\Ò|—–-›QT•\Îaš\Î&~õM¦\î5ƒTFßªÜ¹ü|€e\ZhšB\"9€\ëÚŒ]\ÇC=À_®»\r«\Ö\ä¾7ù\ïdYf¯\Ùûò»?^\Ç\Øñ\ãe™—_~™+~p!Ù´\Ø\Ïhğ–\Ã\Æ(ƒ\ÛÑ””–qıMÿ\à\àƒ&N-ˆ\á\Ø\Ş^h\0’$\ÍL&C6İ £µ•»ï¸…—_x†l6›SFe/‰¿É¿É{\Í\ä²_^Eİ˜ñÔ®E’\\t#K\"‘À0‚Á \Å\Å\ÅDBš››I\Ä\ã,x\×_õ+ú{{e\ÛYnWdÁW=Bª=–\ß]{“&O¡°¸(7R\Şö,Š$‰\å\'¡P„Ş8\ã²f\å\"V®X\Ä-7şi—;•Œ*\Û\Z™\ãN=±\ãÆ‚\ã‚+\Z¥ Á!‡\ÆŸ9’)²\ÌKs_\àÊŸ^±İ¤ˆ»\nùù\çv\Ò&€\İUğÉ¨¢u®\ëò™#\âšn$«‹mM%PQ5…{ï½—T*ª\Ê(²—\Õ—×‰úµ\Éh˜U\Äd”Šª\Ê\Íw?À¤)S)(( °t\é\"šš›©ß°\r\ëÖ¡(2\Õ5£¨©«£ªªŠ±c\Ç2e\êd*\Ë+ø\×]wr\ío~\Ã@ooN\Û÷h>\\\×%\nñ«?ş‰£=\Ó1Å¢\İ@˜¯~×¯ö‹m\ã \Ã\ã\×¼’²\nš·´°r\å*\êFZ\ã\à:.’,\ĞTB uuu‘J&\é\í\íåº«~\Å+sŸ\ÇõSúQW~Š™\Ï~$¿º\ê\ZB…t÷\ÇY¸`\ã\'LÀ\Ìu{Ù–E¬ €€¦QSSC0 \ã\Ò\Ñ\Ş\Î5¿ÿo¿şjNIò\ë\Ü¾&\ï\Éoÿô7\êF¢¸¤˜\îNV®\\\ÎÚ•+X³f–i\Ùc\Ú4öœ6™3gS^VI_\ß\0\éDŠoŸ÷%æ§·v\'\Öö´p\ÇC\á\Ê2Y\Ã\Ë38‚”qYR	ƒTUWPUY\Î\Ò%¹ş\ê«Yò\Şü!\Êİ¶\È(’L&¹ğ’Ÿp\ÎW¿¬\Èh\0©TŠ«ó{\ê‰\Üwó¯6HÿŠ¢PV^\Î]÷=HeU‰D‚®NL\É\Åö\\óş<V,ZHii)\ÅEEHY]û/½?\ï~yù1}P\Ñğ\n…p½g\íË•W\İ@YE9‘H˜–\ÖFV,_\Æ\æ\ÆM¬_»Fl†7n•\Õ5Lœ8‘ö?\Ó4I¥²4oi\â\âo\Ç@Ÿp«\Ú6HRn:$r\Û}S;j45\Õ477³tñ\"\Ş\ïÚš·`{ù\éF\ÇşÂ¸‰S¨®ª£¤¤€\Ş\á\Æ\ë®b\Í\Ò%tT\íšé’JFşd]\í\ØÑœxÖ©Ø¦…ğ²Hº\Øzø»ß½P\ì\ãb\nS\Ööò\Ø]|\Ñ<ß²\ãh\íJ\'(_ —oER¢³š\ÉÈ‡/ú9jÇŒ!™J£**¦cRTTÄ’¥‹™;w.eX–\"ƒ\åØ´¶´ò\â£O\ã\äeZ#“\Ş\0ıÁeWrô±Ÿ\'T1Mw\ß}›\'{„\r«W3\Ğ\×7\è÷¶Œ(.-e\Ü\äI\â	”——s\Û\ßÿÁŠE‹‘eY\ÌOHùw[/K’Œe™\ì9c&¸şF\n\n‹X¼d1|0\ÉD’—{†k÷«\Üo>ûx ?û\Í\ï(Œ¡w\İv+=t?‘HDôio\ĞË²L$£¸¸„#?{z\'N®\Æ-œwöd3b_/¼6ğ\É\è C\å\ç¿ü\r\åU•477s\Ï\İwñôcRXT„ûWÙ¶¬(D\"Qªªk8\è°\Ã9\ìğ#;v,†‘%™ˆs\âqG\ã:\ÂKá“µ\ëº–ğ\×\Ûf\Ô\èr‚A…\æ–\Í<ó\Ä\ã¼õ\Ê\Ël\ŞÔ7)!\æ5\Æ\ï1‘#ı,\'t\Z±HŒ@0Jg{\ß8\çt\ê£%yµ#\Ütg}\í\\\æY\Â\á°h}\×ss›ÿp]‰\êQ\ã8\ëÌ³ùÌ‘‡±d\ÉBxôQğ!–œt$!%yJFÍ¨Zn¸ùv&Mš\Ì[\ï¼ÍœÙ³	ƒ¬[½Š¯}\éô<òñ¯3Hl’\ç\æ²,‹Ò²rn¾\ãN*++q\\—\Ûnû\'ó\Ş~›@\Ğwq‰½’\0£j˜:u\Zû\Ì>€)S§\Ñ\×\×G(\âW^\áš\ß^9˜u\İO\0,ËŒ7?\\•5µ„\Âa–.[\Èk¯>Á[/½D{s¡ p}›¦I0dü\ÔIwÂ‰w\Ü\ç‰E\nH¥\Òlij\æ»_=Ç¶Q5\r\Ë\Ëe\èº.\'vşø\'¨ŠFS\Ó¹ÿ^{üp!	ˆÅƒHL™6ƒ/z6ÇŸğ}ôn¾\îOt\Õ|²‹\îóñ\ÑB]¶Y–inl¢qC=\á`(7\Ñõo¿ı&………ƒ´®„¦øÅ¯Ã¨®-C®•¹«QÖ²1w\Ç \ÙHt\×N\Ê;&şWQE\ë&$\à\Ô\ÓNgô¸qb\ËjE\ÂrLB¡\ÉT‚·\ŞzK-8Vn`K.,™·€\êqC2G\äD\é3Hùz\í”i38\ìğ#È¤À±y\âñG¹õ¦¿°ğ\í·‰÷õ\rA®‹¡\ët´¶òşoò÷?]Ï›¯¼ÂŠ\ÅK°½$\Âœ\Ïó\'\é-K\ì™s\ÚY_¦¦n\r›7ñôÓ\Ó\ÑÑ‚¬J~ôg=v\Ç\Ö})Š‚,+(’„adHô	k¸M| Ÿø@?\ÉD<÷º­y\ëV¯\ä¦?_Ë“O<Nkk3®k“L\')+/Ï¹\èFº‡e™ôuw\rj„*²}=\İd\Ò)‰8‰ø\0}½´µla\Å\ÒEü\ã\Æ\ëx\å\å\è\ÃvLºz:©®Ñ¹ù)„rø\åó¾KaQ²\ìĞ¼e÷\İs\Ş}M\r‚ˆTo£?\Ù\Ë)Ù¸¾ûn¿‹\İ}ıñ~\Û$Tù\Úù\ßVz\Èf³<ı\è\ã4®\ßÈº«X·b5kW¬f\İÊµ¬[±†õ+\×Q¿f#–¡óùc\å˜c¤µ¥‰W^z‰\çx\\E\Ü}w$\"Û@ \ä”3¿Dee%---<÷\Üslin&“I3v\ÂD:\ä\Ğa¶^/<kš&ãˆ½®$\İ00\Ì,“\'O¦~\í:\Ö._\É\ê¥\ËY½t9k–­`\É{˜û\ØS\Ü|ıŸ¹\é/\×ó\ÎÛ¯SRR@2gŸıögÚŒY\Â\ë\ãeM÷\ëñ\ì¯}“XAY²Y¾l1\Ï<ñ\ßù/:[\Ú±i¤\ëŠÁbd\r\Ö/[\Ã]û?ü \Ét\×u;~,§ı\åœ\"\ïCQfÌš‰m›¨šD[[\Ë\ÍÇ·)\Ïm(y›Ê’Ä†5+¹şw?\å\Ş\ßÎª\åKpl‡ºŞ–\Ü5?i\ìT2\Êi’\Ä{o¾Kg{š\ZDòò\Õ1ş|\ê\ë\ë‰E±,\ÇU\Ğ\r›ª\ÊZ~ş‹_\ç\É\'¢O!õ\ämƒ>\Üm\çã¿x†£ª½\Çq¨­«\ã{?ø!©TRh®®C8\Z¦¬²œ_~Ir\Ñ5—Š\Ş2lV.YA[s\ëğK‚GHCH)ş\à<\ã\ì/£g\Òƒ\Zó\ß—·^}‰¦z±5»$I\ÈRŞ–ô\Ş9ÿ}Og\Ï=ñTN;¶m{P¼x/G¬?i8ø \âñ~V¯ZN¼¯ƒ«–T…À8åŒ³s\å’\Ä$“µ­\àXi¡H.’™LzH\ßñ/p\ì\ÑÇ¢©2†\Æğ¬›|$²¶c¢R™$–-v¨UUI–…‹w}Û›:ä ƒQ$l	Û´QU‘”×‡ã¸”WVqøG#¹:F&É›o¼\Æ\ëÏ¿€©‹\r%o~\ÍõKd/\àA\Ïfyõ¹\çyç·\Ğõº\á3G\É=>\ä\ÙL†–&1}÷–¢Šœ”š¦!\Ë2S÷š\ÆN>‰£=‚\Öö&\æ\Î}z\n=+6~s¼­°G®A‹#VXÀaGM  ±j\Õ\nºZ›Y½r®\í\ï\ï\ç¤\Ó\ÎDÓ´Á¶\á:ù\î4I\ÇÔ±,+G\ÈùG¾¥c\êK\Ş‡¸‹5«W‚#Hü‹\'Ÿ*®\å}\Ïu]&\í1•}÷\ÛUqH$:X8ÿ5^yöñ\\ûùQº¢–r ·Ÿ7‰…\ï\Ï\'bd3|ñ¤“\Ñ4‘\Úÿ=À@\"‘ÍM§˜¶\çT;\áDFGUu5±‚‚¡0š\×ù\Ïò\ä÷³b\Ñ2dY&›\É\æ®÷Ic§’‘¯Ë²L_O/\Ë-\ÉM\æù\ÑC±XŒgyŠL&C0ö:§C<\îs\ÇsÈ¡Ÿ¡ª½‘pX|v\Ê*\æ\İ~gş\ËM7S\\\\L(¢¦¦†Š\ÊJ\Â\á0/¼ø›6m\"‚7xUU%•Hğş[\ï\Ğ=B.½üö«D„v–\ÈQPXÈ˜ñc…¤S)Ö­[\Ë\ê\å+À+“/$\\ß¬òöS\Â\ë_–m“J&±<7¯\Ê\ê‹/Ÿ¤ToK\å3\Î>M\ÓØ´i\ç¿Ç’w\ç³f\ÕJ:::0M“\ã?Úº1¹km®p \á g²Ø¶I(Ì•5_°9\Ş`/((\ä\èã¾€+a\è¤RqV¯YI{[Ûˆ\nŒ¸€C*›\ÂrÔ€\ØV^hñ\Ş\ä¸GªªRQU\ÅO9\rESH¥ 9\Ô\×o¤¯¯wğš€\ë:\ì=k!°Ù´©µ«V’Œ\'r\Ï-y™©ñ\Ú\Ï\ï#®\ã\Ò\ß\Ó\Ç\ÒE‹©ß´‰h4J\"‘`\ì„ñC”\Æ|	 (*–iŠ-\Ì-‹	“&óµó¿\ÅL\Ö4xé•¹<óø“tut\n\á\í“\Ä6¨Hò\ÈWQN<õtŠ‹imkf\í\ÚU,™ÿ.\ï½ó6›77€\ë0}\Æf\Î\ÙGünX¹†“\İ002Y\"Á\äµ#ˆ\î•_?¦aR¿vk×®Áq-\Ò\é$%¥¥\È^Ğ‚ß—÷=Ivq]“†úõ,[ô>z&›[»\è¹~\ïo™\"IlZ¿KW\Ğ\Ø\Ø(H\Ğ6©¬©Áõ¼úš7\ï67nÂ²]g\æœYœ{ş7ù¿‹.\â\Â_\Êÿ]xgŸw>g~\å\ë~Ì±L\Şs\Z±\ÂBz:;\é\ë\êFö,¹]…JF\05ã±½Á²z\Å*\Şg^\Î_­ª*²\étš\ç}–‚‚T\rd\×Y\âªk®c\Ïi\Ó1#×Á@\àSc!ı¯Á´,n¿ûnö\Ùo)=EK\ë\æ¾ô÷şû_\Üô×¿°xÁB\n£1š‚\í˜\"\á«aò\â\Ó\Ï\r¿\Ôl¥@xr\Å\'ºÑ£)..&“\É0\Ó\ÕÕ•ó“GH¾›7_ Š9\07OÃ³½\ë3—\ëE\ë¦\É\èq\ã\Ù\ç€I$47n¦~õZTEe\Ù\Â%¬^³Št:‰m›œz¦pH’D\È#ß‘!„E&“\"™L\â\0]r1?û\å/¸ò7¿\æÒŸ^Á¯¯ú=Wşú—üğ§WğıK/\ãğ£D¸„\Ã*\r›X½r9\Í#\ì\ê\Ã2z*MW{\áh˜ÿû\îù\\rùù\á\å?\á—ı„Ÿşú—üæš«ùñÏ®\ä»_\ÂA‡ŒªI†X½fó\ß‡d|\Ğjñ…\\Í¨\Zôl\ËHc\ZY\â}ı¢=W\Şğ}¨,[¸ƒ4MXY©D\×q°Lx¢-0´®\ì¼yI’°mM€\ë+(\à‡—_Î¨š\Zª«F1\ïwy\ë\Õ7©_·>\'|—\ë0ø\íbÓ¸#ı,’\ë7®g\Ñü÷€\Õ+–P¿iY#ƒeœt\ê\Â\r\ç•ß¿\ê\ÖT\ç\"¹`&¦ns\È÷\Å?\Ç>z:{hin¦¿¿Iv‘U‰¢\â’\\9Æ‡iš¤3LË¢§»\Ùw™)Šx^\ßò\Ï{­©*¸.½\İ\İY=¡µ¹…h4\n\ÃÜ¯\Íõ\r\Ô\××“H$°‹\Ú\Ú\Z>ø`ö\Ûo?fÏ\ÅÁ\Ì\Ñ\Ç\ÍQŸ=š\ãO:‰sÿ\ï\\ò\Ó_ğ\Ó\ß\\Å„I{`™\æ2\Ò\Ø\éd13¿¿5«VCğ(++asS#O=ı±¢ÀA0MI’¸\æú©­aˆ0p\×\Ûi+·ÿ1öœ6Šª*^˜û\"\ï¼ó/¾ø\"\ïÏŸÏ¦†\Ç!¨¨\Z\ÙlVHYâ…§Ÿa}¨Xhn\ÛÁH\í\åx;‹CA²\Ù4™t\n\×u\Ñ<…Ä„ùp\è\Ã\ïC\á_ò`YŠ7W¨tvv²~\İ:š7oÆ²,\êW¯£­µ•Db€x¼ŸcÿE\Å%\Â}¼g“$	\ÇÛ…G\"<òHfÏ™Ã¤É“™0q³\æ\Ìfô˜\Ñ\Ô\Ö\Õ1f\ìhf\ì½\'û\ì;“XA”\ÕkV±h\á¼û\Şğ\Ë…Gºa‹\Å8ô\Ğ\Ã8\àÀ\Ù{\æLöš1“½f\Ì`ÊÓ¨=š1c\Ç2kö\Şt\ĞA¨ª\ÌÂ…óY´p\ï¾şÆˆš®eXf–¬‘\Ä\Ş<9A˜\éw\Â\n­¬¨¢¼¼ŒŞ¾^b±0\Å\ÅE[\İ\Ço\Ì[–\Øñù\âŸ\\NIY ³b\Å\n-XÀ;¯½\ãEª	k`ğ:[—b\'œr&%e4l\ŞLkk+\ëW¯\ÆÚš›Ù¸~\İ\İ\İôöö²÷œYÌœ³\Ùì¹ ,o+xD3Œÿ¹ğ‡±c\Æ Ë’p\Ù\âŠõg¾pO&“$“I²\Ù,®+¡\Ê\Â]\æ8 _\×òı×–e…¨5Š\Â\ÂBÃ ¬¬„²Š2ğn{õ\Ö\Ñ\Ú\ÊsO>Å«¯¼B__Ÿ\é\ê\"‹ug®˜+,,¤®®–)S¦0º¶}ö=€¿ıó_\ì³ÿÁ#Z\êŸ>2ê®ˆ\ëº\È^*\×\ç¾B6™Âµ\Äî‹†aP^^\Î\âÅ‹yıW))/%­gA‘1m—ò\Êjn¾\ãJ\Ë\Êr“\Ó~£–·Ô(\äv\ã£\á\í?ÿy~u\ÅOyş\É\'±2*+\Ê(-)B‘!ÒdE’	ƒ,|o>ÍM°Csd[dß•\Û\Ş\ŞNcCƒ\ç’q„K¼[·%†Á·bü	\í\Üy\ï³ò\Ê*?úúûû1M“¥\Ş\Ï][\ÏfYü\Ş{z–ş^,;\ËY_>F,ùPø‚¢··—u\ë\Ö\Ñ\×\×Ggg\'\í\í\í455\Ñ\Ó\ÓCii)¥%Å¬[·†§|‚¹s_\à\ÉGŸ\äş»şM¼€\êm\ït,yŸaôôu³©¡‘\Î.¶4·\Ğ\Ñ\ÙAKk\İ\İ\İhšF4fÕªU<ø\àƒ¼ğüó¼ğ\Ìó<p÷¿1MkD—csófzº0mC¸Âƒ$	Ï¥™£\0\Éÿop^’$JKJ½õ^	::\Ûˆ÷\å\Æ\çp¼EÁªªq\Ö9_c\ïYs “Í²~ızyüIğº\Û*|PÍ¿j>1CaNûò¹ôõN™¬^º\Ë0Ä®ËšÆ’ùó1ƒl6K*•âœ¯7¤Œ\Û\"9\×u1M±¬aø3‰R\å¶\ã0k\Ö\áõ\É\Ä\é\í\ï\Âv†¦ŠÚ°a=½½=\Ø\Ş\\˜ÿ{i˜54@\0=›eÜ„	\è\Ù,ñ~º{:\è\ïGVò\Û{¿­_³–\ïş=ğ ó\Ş}=«“\ÍdIg2$S)\â‰8ñø\0qúûûql›\Ö\æfºº\Úù\Ù/Gm÷ÿH\0C>ºFM\0WhÂ¶eó\à½’ˆ\'p=\Ï0JK‹yı7xù•¹TVW\æü°ñxœ\Â\ÂBn»û~jjks\ß\Ç€~\æ\à²\æú£\Ûv\ãÃ¡§v\"+\å®k\â;\ï\âÖ¿ş\×^|‰\rk\Ö1\ĞÓ‡\äy\Ë\Şy\ã-¾3\Çq(o©ß¦b\à)\Éb\âú\Î.6nÜ˜[\èwú™gD†-l¾À¶=·N\îWQU•S\Ï:›L&M__}½]¤’IÆŒÏ˜qã¨¨ª¢»³“l&®Csó¾xòÉ”•W`n\'¯Á†®\ë¬ZµŠ¿ÿ\å¯\Ü}Ç\Üs\×\İ\Üuû¼òò+lØ°\Ó4 ¥¹•;ÿqo½ú\Z†®\çü¹\î7ƒóf–mó\Î[os\×m·ó\à¿\ï\ã;\ï\âŞ»\ï\æ\ÕW^¡¥¥Y–\é\í\í¥a\Ó&\î¾\åv\Ş~\í\r\İÀ¶,Q7Ã°©¾6t]\'+\ä”\ÓNG‘•\\z&UQ¼:\ïeI¸=\ÇÁ²,¦\ï½7ıı½(ªD2\ÑÏ–\Æ\Í[µ™ÿÎ²!\Î\Şw?\Î9\ïÿ„;Ö²illä©‡!“J\ç\æ¿$\ï>ƒıgdÒ$‰\ãO<p‰\Çã˜†A{k£\ê\ê¨3†Qu£I\Ä\ãtwv\âº.]]]L>\é3ö~©¡ğ\ê\\\×õ\Üö\ïù\åúÿù‡‡‚XPˆşşlÛ¤«³T\"9ø ·»‡d2\É@?UUÕœ|\Úi¹\Ïò­¡\áYd¦\ì9t&ƒ,\Ë$	\ÚZ[qAK\Ê¶p]—\Ş>\Ş~\íunºöO\\ôÿ\ãŠü€_\\z)¿ÿÅ•\Üx\Í5\Ü|\ã\Ì}\îY=K0¨!\Ë½½]ôõu1c\Ö\Ì\áEø\Äğ±‘^\ç\Å3%Ó©=ôa\í`™Š¢P\\R\È\ëo¼Á+¯¼DIi	.²ªb\Ú••\Üğ·[˜6}/\Ñ\Ù]77w”›aË\İø\èh«CSq5o÷\ë<²º\ß~\'\Ü}O<ü+.¯]}\á3Rv	H\å;Ğ†3\Ûqhjh \èÇ²,l\Û\âÿ¾õ$iä„¨¾VğÒšhZ€™sög\ê´X–%¬))Š‚,\Ë•pø\ÑG\Ó\Ö\ÖBii1ee\å\\|\éeüù\ïÿ\à\ï·\ß\Éo¯ı\\òCÂ‘\ÑX„\Î\Îvú9\á\äÓ¶®\Ã\á\à’ÎŠµ$Õ•U¬_»\Õ+V²r\ÙrÖ¬\\Å»o½E\ã–&\Ò\é,µµ£ùöw/\àŒ/\r¶\ëOn\ç#¿|bH§³È²\Ê\è\Ú:Ö­Z\Í\ê\å+X½lk–¯\à¹/\Ñ\Ö\ÖB{[£G\æ‚¾\Ç	\'‚“·¹\åH\è\éì¢¿¿—t:Io\ß\0{NŸÍ´3qó\æ\àğ\Ê0„$‰³\æ0u\Ú4zûº±¬,½½\İtwvikÅ›\ï\ÂûMaQ	Wüòw´¶¶‘J%±m›—ö–TUõ¬cñûm\Õzşy8\í¬/\Ñ\Ó×G4\Îÿş÷ù\Õu\â\Ï7\ß\Âo®¹–^qÅ¥%TVV\ÍfH&œö¥/QQQ1ôš\Ã\ÚÀö²+–[©\ë?™,I\Èò\à\n…9ğ\Ğ\Ãr.U\Ó4\é\ï\ë\'\á\Í\Õù¿İ¼©×¦¿¯—#ù,\Å%¥\È^ÀLş\ßüC’$¾xò©—”J¥H¥ôõ\Ò\ÓÕ“«s)?\Ì\Û{\Ó0PT8\Ò\×\ÛCgG;Í›7³v\ÕJ–-^\Ä\ã>À÷\Îÿ&¯¾üY=\íXt÷t¢|\ëø“\Ç\ÇJFù\ëlTM%™Hò\È‘N¥Q5\Ë2‚Œª­\æ\ÕW_\å™g¡¢²Œh4†i\ÚÄ“\Ê\Ê+ù\ãõåˆ£¯\Ó\æ©n\â\Í^ÿğ\ëy­V\È\ZI„\âKò`ˆ\ë¹\éò\ç‡“–mY¬YµŠ––‰~6m\Ú\Äñ\'œÀG‹v\Æ# \Ò\Ù°§\rÖ\Ë_\Ê57\Ş,´iIFQTÁ š@U5>\ÂÉ¤\Ó’©õ›6\Ò\Ñ\ÕAww7,\àwŞ¦±±ööVšššhÜ¼‰p(D{{;\'Ÿv&EÅ¥y¥\nI’p±FD¸9\á¡i\Zš¦‘ˆó\ês\Ù\ÒÜŒ\ë8464qú—¾Ì˜±\ãq]AH\Û\ß\ÕW\Ôq:Æ¶mÒ™4!/ºK–eTU%™Hğ\ìO\Ò\ÙÙ\ëºl\Ù\ÒÌ·.ø•UhZ\0\Ù\'O@ù\ä—\ÍdY¾x¤\Ói\Z\Z\Zø\ÅoO\ÔÛŸÊ‡?o\çzÚ¸	“øÃŸşDK\Ë\\×¦­­•µ+W“\Íd†´u>:\Ã_ÿy½½½lnl¤¶¶\æ\Í[˜ÿö\ÛÈkn0`adÿ\ä\èc>‡¢)tww\Ğ\Ö\ŞLWO­¬]·Šy\ï½\Í\êµ+\éè£¿¿—•+—#I.\r\r›˜³\ß~”\æ‘\Ñpˆvõs šH\Ò\ÖJ\ÔpÔ\ËE—ü˜ukW£\ëºp\Ó6l|\à»;;Y³j\Éd‚d*EGG;\×\Üğ\×AöÆ”\ã½\ã\Ì\Ùûpş…²a\Ãz$IXy\ï¿3O(]^2^Ÿp]—ó/¸€¯~ó›\â9¼ 0ÿ\Úş!Š\å\"K\ãÆ¥  †,Kôõ÷\Ğ\Õ\Ù9\äşŸ$”\Ë\nKw|\éùG@Y\ËFQQCL§Ó¬_³	\ÆF±Û²‰Å¢lnl¤aSÓ¦Í  V°¨dö5‹¢’b–.Zˆ$I\\Ÿó\Çx/—]ı½³Q\Ö\\\Ï5ñ>.+N#û_CYK}N\\\ê=\ç¥%\\ZP\Ê5‰¾\í\Ñe…¥\\VX\ÊÕ‰¾­®\á\ãÒ‚¾mIü\Õ\ÎPU]ƒ\ë:tvvq\ÒÉ§0e\ÚtúÅ¢Ñ¬.R«¨šFEe³÷İŸóÎ¿€s¾ş-’©Á`=÷œ\Îk/¿@ ÀöV°—rÁ%?¤·§‹ş¾>\Ş}\ãM\ŞzõUÖ¯]\Ëú\ÕkX¾t)\ëÖ¬b\ã\Úu¬X²˜d\"AM\Í(dY%\"\Ë2+–-!\n\å\Üişò„Úº\ÑtğAttt\â\Ê2=\İ=,Y¸0\çzó-»øÀ\0ª¦R=j™Œ„\Â>û\Äó\Ï>\í8\\›\è\ã\ê\Ä`?º&Ñ—u£G³\×\Ş3\é\ê\ìBF,•x©½ŸKKùIA	Wô€\çş),.¢¨¸d×•˜½\Ï¼òâ³+\ç2ø×–d‰\Öv\ÆOOIY)©LE“ù\Úù\ß$›\Í\Ò\ß\×O2™Dò„\\yE%gû~ò³Ÿ\ÑÜ¼…\ÎVÀfsS\Ï>úln®\ç\êx÷¢UU\å×¿¿\Òò*V¬X\ÆS¦ #s\é\Å jƒ‰b}A\ê#²ÿÁ{®¨A+\Ùu]‚Á \ç_øK§··‹\ï¾\Ís_bıš5¬_µšu«V³j\Ù2V¯\\\Éò%Khjj¤¬²’h$‚\ë\"²4¼ş\ZŠ—›\ÏïŸ’$Q^QÁQ\ÇC[G›°\ëe™¹Ï½€\ê}WU\Õ\\¤\à\Øñ8ş\ÄSøşO~BcS=†©£h2\İ==¼øÔ³dÓ™\\}Vs\élog\ì\Äq\Ò\Ş\ŞAÍ¨Q|\ã[\ä‚\Ò\é4¡\È\Â0u\ÚtN;\ël¾s\Ñ÷Ø¸a=‰x‚t:\Å\æM\r\Ì}\æ9•=ŸD‹Š¸\è\'?Á–$J++)*,$Š\Èd\ÏeŠ\×.£\êFs\è‘GSPRŒ‹ƒe[tt¶ó\æ+¯ñ£pa®\Î?I\ì\Ôt@\ÛB™·µµ\ê-¸ò;\ïI§ŸB\Íh±¡\ãˆ\Ï{û(+«\äsÇÄ¨QutwvÉ¦‰ô!\É6­Í›ù\Û\r7\Ğ\ìiœ>\ëoO8\îlø[ÿ7Xee-õz\Øa464°\Ì\r\æ¥.;Øº®;DCspC\'‡[5¾uµ­ö)o©ç¬¯\Ë\è1\ã†‚hšFUe\r\Õ\ÕÕ¸C&›\Å0M\"\Ñ\0Ó ¯/NGG\0ñpÿ]·\Ò\İ\ÙF0&›IsÊ™gó\ÅSOf\Ãúõtuvr\×\ÍÿÀñ\"—E\É\í´\ë—Oø\æ…PQQ¢¨L?‘\Ï?øÀÀA	°ÿñ‹.dÃ†\r–³~\ÍZşu\Ûm\Ø\ŞBT7O›\×\Zgœ{\ã\ÆN$“1\Øgö<ı\ä\Ã\Üÿ\ï;ˆ\Åbl\ÎË\\\îm\âp\Èa‡qöW¾Bó–-\Ä\n\nØ°n\×=ÿÚ\ïú\åŠÄ¢œ÷\íoSRZN:aŸ9ğô£ñ\èCÿÊ¹óŸÁ¿GEU%\'~\éTªª«1u‹‚‚\ÆO˜@8\"•L“Ne(**¡°¨ˆ\Î\ÎNšš6“Í¦QU‰ö¼\ë>\âıñ\Üõı`	\ÇqP5N>³\Ïı:‹-\"3}út6\Õo\"1&™°)++!uPT›`0ˆid2\n‹ŠÀ…\ïü\ß\×Eyó„\îŞ³ö\å\ÇWü‚Uk—‘L\'¹ó¦›H\'“¹ûû´\ì\ÍC©ª\Êq§œ\È\ì\Ùû\à8\î—\\ø]6®_?h9ze3v,W]{-\r\rõ8’C4ZÀ\Ø\Ñ\èO‘Î¤p]=z´°–™^67m$“M‹\Å\è\è\è\à•\ç\æ²a\ÕZ\Ü<—§ÿ\Úq\ÆLÇ‰gœFEy™t–’\ÒRÆO8¢¿¿ŸŞªªªU•6n9E¡~\Ãz{\àA{0Oˆ\èSÛ²ø\Ò×¾\Ê!GÁ–-[†BXYl\Z¦a ª\Z®#B÷ƒ ®\ä(¨…\æ>ó,o÷Šl\ï»Ÿ\á	9ß¬ô@0È\Ó÷\ä\à\ÃA	hX¦+KØ–‹aX\ì·\ï\ì»\ïş¤Rº:\Ú\ÉdRdõ4\Éd‚7_{™gŸx2\×	]o}\Ä\"8we\ÍõŸ*\"\Ê\ßªº£‰öª1T´n¢¶n4g\í<&\ï±“&MbÁü÷Y4>ó\Ş~‹¦Í›‡eò¬¡|a\êòÁ[+\ïœ>m<³ö ö¼òV\ëáº®°½‰–\å`š&m--,x÷]š›6\çrºI’L(\æÆ›o£µ½…l6\Ãc\Ş\Ï\Æ5kÁh\Ã÷\Í\Z\Õ\İ\Ìÿk\ï\Ücã¸®;ü\Ícg–»K\î’\\’\"—\"EQ²$Z²eÅ¯8n;¶e»Œi\í_A‘M\â>§0Œ6hP ER4	Š¢-÷\ÆIS‰QN\ÒIÅ‘-\ê\å\è\Ù\")\Ê|S\\’û\Ş\ÙÙ™şqg†\Ã!)Š¶$\Ê\Î|\0!\í\î\İ;wf\Î\ï>\Î9W’$v\î\ÙÍ“¿ùQ\n\Å{vpö§ø‡/ÿ¸·\\·sI\â®{\î\åŸş¿8ı’\É$Î¿Á>ÿ¼0ø®pzø•J…\Î\î­|\ä©ß¡¥9U·ùÀı¿\Î_=÷‡Şš\\VWŒTU\å\Şû\î\ã\ãŸøoœ?OS2\É\Ï\æk¯Z*;1Œ\íd˜°m›LOOşöo‹%ˆF¸óÀûù\ë\Ï?\Ëà«¯`99\éü\Î’$!\É2<øøAnÙ½\Ë.EQˆ5$e™JE8B\ÔLE–)WKœ?w#?ş)y\'P\Ö\íq+ªHzZ­T¹\ã}wò\ì_~cÇ!I–dUABÅ¬ƒª¨(JYö@\×E¾=EQ°-‹\Ï=ı§^]m\'\Ñí—¾úOT\rƒñ©1N\ä\'?x	|kN\ËzQ\Îû\İ\İüş\Ç?Nµ*Rü\äùü³\Ïz¡$²,cš&--­|\é«_addÓ¶\Ğ4h4¶\ì-M[\ãŠø·‚e™ Y\äsy~ôƒrşô9¯“\ç\ZVUU©;¦i\ÒŞ¹…>Lÿ\ÎX¦ğ\ê:1\'v(Ÿ\Ëa\Ö\ë\Â\åa\×_}\Ã?ú1FUL	û;\éñ!dE\æ‘\'~I‘\é\Û\ÑO\"‘@\Ó\Ä6=8ka\"¦i\"“ŠlcTªF™ú‡\ç7Oˆ¸‘b\ä\Ç\í•ËŠB\Í0\ØÒ¹…‡ŸxŒx\"\î<\Ğ\nHb\Ëòm½Û¹÷\Ş`\×-\n…˜uI‚\é\é	¾ó\Íoq\î\ìp}\î}±,¿ªd\æ\Æyğ¡Gø\Ğ\Ã‘#Â°\ïÚµ‹¦¦&,KòÁ\×^\å\È\Ïsú\Ô)^-‰u¸`šk02Zwdb\Û6Í­­\Üq\×û\Ø=0€Õ½Ş¤…\è\é\Z†A¹X\â\Âoò\Ë\ÓgX˜™ºİ©Y’hhˆñ\'şM©F†G†\é\èh\ã\ì©\×9ô\İ\ïR$%s²•kšF¥Zåş½\Ûwr\á\Â\Z›\Ø7°o~ı\ßù\ŞË‡\Ğ\"\"B¹R\á\ÓOÿ1;v\İÂ›\ÃC\Äc1‰ÿ7\Ë\â\ÂÂ²«ûÿ\ÎL7Ÿ{\î/£X,‘n\é\à–{x\é\Åÿ\æ;\ßş&m\"\ã·{\r,\Û\æÏy†®\în.\\¸@\"‘ 1‘\à\Ë_ü\"o\ÆÄ”;2r\r\Ó~¹Æ§>ûYff¦0M‹X4Á\íû÷ó\Âü+\ß?ô?\Ë6!tG\r~£¹g\ï­lİ¾·\ì$\ZR7m¢ºN¥ZÅ²,ÌºÁ\Ø\è%NcnzvY\"P\" K\âûbñ8ÿøµ\ã\ÜÙ³”\Êe\"\É\ç\à\ÖC•j¦Hs¤ib\Ú\Î]n\ï\ë\ã\ÓğIñ\İÎ³ı\ÉO=\ÍmplpTkF\É\ä+_ü‚øy§\İ¢S\"ñxœ»ï»|\ì)F†‡)—\Ë8p€#?ı\Ïÿ\Ë?{³4\Ñh”‡y”Çxœ7\Ş<®\ëHª0\Ş\Õju\ÙÚ¥\ä\í^k±\ç\Ôñ“œ?sn™,\ËÂ½\Û\ë\ÙI„>EUØ·—{\ï?‰F!üşiKI’0k5†.1x\ä5\æf.3½e›wD£Q\ŞòM·OP·\ê(²Bsk·\í¥»w+m\í\à¬\ÑJ²Œ¦‰µ\ÄR±ˆY39wú,\'£T(.\ë˜n›\"Fø<\×\àH’\Äı\ÜÏ}û¼›5\Ñ)”Š\èZ==\ÛØ¶­r©J©T¢Z.¡Š¢p\îôY¾÷Ò‹7¯«?\ÆMIwv‚±–.¶LR3M>ø~ø\Ã^Ä»\íd\Ç\î\ìì¤««‹J¥B©T\âÄ‰\ã\äróhª‚aœ8zŒ—\n~½\Çõ÷ôø·#\Ëb€–\Ö’\É²*ò°U\rƒB.\Ï\ìÌ¬—Os¥qŒ\â\åL?·I5¶÷\ïdjj=ªc[©\æ\'£R®xœ+F.;JóÜº—\\nÑ›ö$™–\æN?J¡ M:\İÆ¾\Û÷355‰ªF¨\×M\âñ83³3Œ\Ñ4g+‰ \É2\İdº»\Éf\ç<\0‰L&Ã‰\ãG9¯\'½z¤\'†I¥R\ì`>;O$Á¨´´´2=5\Åkñ¸zb¤(\Ìvöñ¦(©–fr¹º¡Z1¨[u2™nNe>›\Ïx‹\ê\î_İ²™¢ªttn!‰h†A~1\Ç|6K½n.\Ë]&9¢\ëÊŒ;‰D\èßµ›HDõ³—ÌŒ\íÌŒÈ²Œ\ídF°-‘YºV\Éyw\ï\à[/¼\àªvo\ía\ç®İŒOŒ\ÑmÀ²!o\ä_a>;ç‰ªû;b4\"Fw\Üu\'ù|É¶iˆ\ÅX\\X \Ó\İ\Ã\ë\'“[\\dª£—ö\É\î¹÷>shZ„Z­FC¬A©Z¶p\Üqœ:\Ã6¨\\avvûš¹xc#§	\ÜöQœiš¦Q­VI·¥iJ5Ç‘$±ù]>—g>;O\Íb}eg—µ\é/^&Ùœ¢!Ö€$KØ–ˆ£\Ê-\äX\\X`²mù\ŞEi\ßşf7šM#ƒ EÄ…w\é\ê\î\âƒ?@sK+¶mSw¶„®T\ZI:;3$“)\ìºEµR£¡¡UU‰F£¼~ò8\ßş¯opÜ”½ıy\"Nzø·{1ov\Ú\'E¦„‡9\È\Ç~÷÷ˆ&\är9*NOX\ÚLMNR*—©T*T«U4]1¶Å¹3g91xŒb¡\à=T³]\Ûoø™v²‡\ã\ïq^»4ø™,\Ë\Ìtö\Ñ6!­;\ç\áT|£÷{—De\é÷ıSy6 kš7u\ßwu\Ë¨[\Û\Äğ²\Ï\\T5‚e-7J\îƒ+°\í“#\à\Ë\Ûfû¦=$Wœ@V_[J\Îö8ç¤ª*–m/s\"\âŠ’\ä¹tÛuHwô»şviß²…™©)¯m\İ\Ïl\'˜Şª¯ŒKòg\íX)\rK\á\îh\ÈrÖ”üÓ¶nûû×Ÿ\ÖÃ½\Ü\ë\ë\ÆK\n¼;\Úy%^û\ï§\à½¼\×n”\íJ;»Yßˆiù\Õ\ØT1\Â÷Àƒ\Ø+Äª‹ù\å»ï»‡½ûo\'–ó¨\ÕjC\ÜXC‚N\Z›°\ê\âr§š›iĞ£È²Ä‘W~\Æ\Ë/½\È/ÏErz\"no¤^¯¿-Ã´¸k8n};g.a\Ôj\Ìeú\éš‹”‚>õz4J>—£fšT*\ÃÀ0\n…\ÙùË²e‰¹ğj©\È\Ü\åË¼ò\Ó\Ã\ÌLM/3ğö\rv	’rz¢K=y?6vğ-o”\Ó6)¶@pò a\Ü~1\Â1®\áp\Û\Ç\áL«8\Å?K_>\ãÑœQ«³\Ş9Ñ¶\Õ+ãŸ¶t§[.\ØCv÷?š\í\Ú\î­¶M#I3\"y©k\Ü\\‘·b’\'JÁi\Øôøw+\Z\Ú3«+qƒce	t¯(F’ğ4s\Ï\Ï\ÍHî·¿\ÍEñ•S\ÉK\"°¶¹\ß\å¿\Ï]‚÷G\Ç\ÔEo\ê\×_:x.ÿG´\åR)¿³»o”\ä!:9ù]‚uº¸\"„skeÛ¿\Şlº±\Æ\Íz9\ÓÏ¶\Ü4î¾“ıûPœ€0±ÈªˆEE[¢­­\â±\nzDC\×uš’Ifg¦ù\Ö7¾\Îÿı\ï÷\É-.8\Ñı\â\æ5MsS\r\îÛ¥u|ˆ½ûöñ\Ğ\Ãùµ$‘HP*•0œ€»jµJ6›%;7G±\\ X,Ši[dN\×uÙ™ÿ\è\'V$¯\íıÿz‚›ú\ßˆ\Ç3h,YVFl\ï±ô¾˜~s3C¬v\ìFğ2L8½ÿ+r5e\ë\ç\Ïhü\ìjp\Û%¸ù£ÿ!\í³<sÉ•¯ƒŸU\Î/p\ŞW[\ïôøÇ­aÉ€\Ë\îHÔ™\ÂÃ½7—ùX\å\Zù\ë\Û:>´j™+³^\í„0‰Rş²\îo,?~µkq½^\ãù\ÛAn\n1Z\Ş\Ü4\îz»v£\êQ4M£T*a\ÕE\'K\Ğ\Õ\ÕEoO/‰\ÆFTU[x¢\Äbqò‹?6\È¿ÿ2¯Ÿ:A¥\\ò¦NnAZMŒñ	„\rôôöòÁ>\ÄO>\ÉÖ^\Én‰µEQ(•\nLLL0>>\Î\â\â\"\0jD\Æ6E@¡¢(¾r„3\ÎV\rÁsO\ß\ài¹w«¥;,\ĞU¹Jƒ4\Ük‰\ì;\Å/ğ\îo®&\\\ë\\k{§\â\É*q#\Ìev8¡#Wh\ë+|\Äjb´!®\Æ|®.:×”\Õ\Î•·V\"ê´‘{\àzñ®#—mùv\ß:Àmw	5\r³&6ı2\ëut-JW&Coo\ét;±XYˆ2bd5?¿\È\é\×Op|ğU=\Â\Ø[—V5Àş\éCXšbqY\í˜+œÕ¾\Û?¥mh`\ÇÎ\Üy÷=<ôÈ£ôöõy®·u³†ª‹\0\Ï|>\Ï\è\è(££#\äóy$Gxl\êX¦ğ\Îatø\"\çÏœ\İp½\ÕY\Û8­#FWIĞ€_/1º\Ùy»‚l£` ûz­Ë´²ı×º\Şkq“˜\Ï\ÕÄˆµ\ÏœªK¡m\×!Á]ÿÙ³\ïVn»\ã\â‰8M\ÃÂ¦n\ÚNŠv›t:Mooıı;HÄ›Pl‰Jµ*Fu‹h4\Ê\Ì\Ì$¯ü\ì\'œ~ı$\çÏerr	\á1ƒO(‚bD@P®Dp>\Ø\Å?òio\ï \Ó\İ\Ãî½\ì¼e»÷ì¡­#¢(—“Œ\â$C\Ì\å˜˜˜`xx˜\é\éia-ID4\Ùñ¥b‰Ñ‘ÎŸ9\Ç\Ì\ÔU\Ç\Ã\Ëı\ÍP”®•\Æ)x¬ve}‹Æ«…bte6\Ú&­Á\Êö¿ry¯/²\Î¾\Æ\Ï½óóXcp<ÿ\Í\ä¦£\Õ\Ö\\QB¬{²­o};ú\é\éï£±©\Éó\Õ7M“B¡€‰²eK†L\×Vº»Åˆ)‹M´L“b±\è\èZ­Fv\î2—.2v\é\"G†˜™¤\Ï3;3M>Ÿ£\\©x\Û¬&P«Qw¼vb±‰D#m\í´wl¡5\İ\Æ\íûĞ·½Ÿ¦¦$ª“\×LQ\"	d›ºU\'_,055ÁÅ‹™œœ$ŸÏ£ª\ê\Ò_DFF¢T(ò\ÚÏpqh˜¢™#|7j-\è½D\ë\ØP@o‚\×<£kA(FWGğü\×;?PŒ®?iÇ½U¨l\Û\Ş\ÇÖ¾^º2/Ì–D0Y¥lP¯‹(\î\Î\ÎNº»·Ò–î ­5¢DœQp°-\ákÙ®›«H_.—)\ärŒ‘Ï‚“Â¾n‹½\ëq‚\í\"ˆA•UZZ[\é\ì\ÚB<‘@•UôhLx_\Ù\r\r\rc†¢((ªŒd‹\È\îù…9\Ê\å£—F˜fnn\Ó\ëCº®{16º®3Ÿ\Í2ô\ÆF††˜\"\æD\ØÛ–Š\Ğ;`iš\'ğ˜¬5-²A‚\ÆÀ3Ê¶´â³%‚\Óqk±±¿^ùï‹·IPd\Öc\Ãõ\\ƒ\àùo&\ïj1j›ö\Üj\ëu“\Ë]¢a3sct÷tÓ»};\İÛ¶‹Ç‘eTY©TÁ\â\ÓOL&I&S¤\ÓišS­¤R)b±ºŞ°\Â\æX–\ÛqÍµXÊ„Ä“%Y–‘gjÏ²±m±6T.—)\n\är\Ì\Ï\Ï3=1NvaJ¥ŒM\Ó4ˆ\Ç\ã\"€\ÒuD(¹\È\Ü\ì,\ã—\ŞbjrJ= ˆ*Òª„\"ô\Î	\Å\è\æ$£\r\Ös\r‚ç¿™¼«\Åh=:¦.b\Ùb_¤\Ì\ÖnZ\Òiº¶voL\0\"\Å2k˜\Î&dş¸‘DS#É¦)\"º\æä©Š\Õ\Ğuˆ¦¡9)Bp‚òp¦\îL\Ó\ÄtbšL\Ó\Ä0j\Ôj\"\î§\\.S.)óK%ª\Õ*\Õj\Û\Û\"šBD\Óo`a[6s—/3ö\Öc/191Y[¾qš\êKB®];VL]#r	\Z¿‘	~²\Ò¯\×FÁòA‚Ç¯W~£ŠN\r\×o‚ç¿™¼§\Å\È\ÅõdSœıâ“©$-m­´u´\ÑÜœ¢%\İB,w\â\ïDši\ÕEJ•º/ù¥,-\İ?K‚\à¶PKNK#(?šº´q–+bŠ$ö¨Q$™\Üb\é\É)\æ³Y\ÆF\ßbqa|¾À\\¦\ß\êTœ{œÑš:%\\B1º¹\Z\ãõ\Ú(X>HğøõÊ¯ £k\Æ{^Œ‚.\ÕAl\ÛFDhlj$™j\"™JoŒÓ”l¢­­CŒŠt‘\ÖErF@¶m#;Img­\Éö¥‰wG(`¡úvltGM–Y£R©P3jrE\æ³Y²—\ç\È/\ä(\äò\\j\îVsM‚\ÆÒ‹»ğ½			¹\ÙyÏ‹‘\ß0/OĞ±œ\à¨ÂZ—ün]C\ê\èzM\×PTE‘‘Ug=\È\'8–%ö±-K¤ß¯Uƒj¥ŠQ­R­FõšEPŒ‚\\‹\ß			¹Ş¼\ç\Å($$$$\ä\æ\çWoÏ…›PŒBBBBB6PŒBBBBB6PŒBBBBB6PŒBBBBB6PŒBBBBB6PŒBBBBB6ÿübì–©–\×\0\0\0\0IEND®B`‚');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned NOT NULL,
  `name` varchar(160) NOT NULL,
  `email` varchar(160) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `tax_id` varchar(40) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_customers_company` (`company_id`),
  CONSTRAINT `fk_customers_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,1,'Cliente Uno','cliente1@mail.com','+54 341 1111111','20-11111111-1','Rosario','2025-12-13 13:49:14'),(2,1,'Cliente Dos','cliente2@mail.com','+54 341 2222222','20-22222222-2','Funes','2025-12-13 13:49:14'),(3,1,'Cliente Tres','cliente3@mail.com','+54 341 3333333','20-33333333-3','Rosario','2025-12-13 17:45:29'),(4,1,'Cliente Cuatro','cliente4@mail.com','+54 341 4444444','20-44444444-4','RoldÃ¡n','2025-12-13 17:45:29'),(5,1,'Cliente Cinco','cliente5@mail.com','+54 341 5555555','20-55555555-5','Funes','2025-12-13 17:45:29'),(6,1,'Organizador3','organizador3@gmail.com','12313464613',NULL,'Montevideo 14113','2025-12-15 17:45:28'),(7,1,'Organizador6','organizador3@gmail.com','12313464613','','Montevideo 14113','2025-12-15 18:24:41');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `product_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `fk_pc_category` (`category_id`),
  CONSTRAINT `fk_pc_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pc_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_components`
--

DROP TABLE IF EXISTS `product_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_components` (
  `parent_product_id` bigint unsigned NOT NULL,
  `component_product_id` bigint unsigned NOT NULL,
  `qty` decimal(12,4) NOT NULL DEFAULT '1.0000',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`parent_product_id`,`component_product_id`),
  KEY `fk_pc_component` (`component_product_id`),
  CONSTRAINT `fk_pc_component` FOREIGN KEY (`component_product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_pc_parent` FOREIGN KEY (`parent_product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_not_self` CHECK ((`parent_product_id` <> `component_product_id`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_components`
--

LOCK TABLES `product_components` WRITE;
/*!40000 ALTER TABLE `product_components` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned NOT NULL,
  `sku` varchar(60) DEFAULT NULL,
  `name` varchar(160) NOT NULL,
  `brand` varchar(120) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text,
  `stock_qty` decimal(12,2) NOT NULL DEFAULT '0.00',
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `currency` char(3) NOT NULL DEFAULT 'USD',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_type` enum('SIMPLE','COMPOSITE') NOT NULL DEFAULT 'SIMPLE',
  `pricing_mode` enum('MANUAL','AUTO_FROM_COMPONENTS') NOT NULL DEFAULT 'MANUAL',
  `computed_price` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_products_company_sku` (`company_id`,`sku`),
  KEY `idx_products_company` (`company_id`),
  KEY `idx_products_category` (`category`),
  CONSTRAINT `fk_products_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'SKU-001','Notebook 16GB','Dell',NULL,'Notebook para oficina',10.00,1200.00,'USD',1,'2025-12-13 13:49:20','SIMPLE','MANUAL',NULL),(2,1,'SKU-002','Mouse InalÃ¡mbrico','Logitech',NULL,'Mouse inalÃ¡mbrico',50.00,25.00,'USD',1,'2025-12-13 13:49:20','SIMPLE','MANUAL',NULL),(3,1,'SKU-003','Monitor 24\"','Samsung',NULL,'Monitor Full HD',15.00,180.00,'USD',1,'2025-12-13 13:49:20','SIMPLE','MANUAL',NULL),(4,1,'1231','test','tarara',NULL,'rarata',14.00,100.00,'USD',1,'2025-12-15 17:45:52','SIMPLE','MANUAL',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quote_items`
--

DROP TABLE IF EXISTS `quote_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quote_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `quote_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `item_name` varchar(160) NOT NULL,
  `brand` varchar(120) DEFAULT NULL,
  `quantity` decimal(12,2) NOT NULL DEFAULT '1.00',
  `unit_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `currency` char(3) NOT NULL DEFAULT 'USD',
  `discount_pct` decimal(5,2) NOT NULL DEFAULT '0.00',
  `line_total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_quote_items_quote` (`quote_id`),
  KEY `fk_quote_items_product` (`product_id`),
  CONSTRAINT `fk_quote_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_quote_items_quote` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quote_items`
--

LOCK TABLES `quote_items` WRITE;
/*!40000 ALTER TABLE `quote_items` DISABLE KEYS */;
INSERT INTO `quote_items` VALUES (1,2,1,'Notebook 16GB','Dell',1.00,1200.00,'USD',0.00,1200.00,1),(2,2,2,'Mouse InalÃ¡mbrico','Logitech',2.00,25.00,'USD',0.00,50.00,2),(3,3,1,'Notebook 16GB','Dell',1.00,1200.00,'USD',0.00,1200.00,1),(4,4,1,'Notebook 16GB','Dell',1.00,1200.00,'USD',0.00,1200.00,1),(5,5,3,'Monitor 24\"','Samsung',4.00,150.00,'USD',10.00,540.00,1),(6,5,2,'Mouse InalÃ¡mbrico','Logitech',2.00,200.00,'USD',5.00,380.00,2),(7,5,1,'Notebook 16GB','Dell',1.00,1500.00,'USD',0.00,1500.00,3),(8,6,4,'test','tarara',5.00,250.00,'ARS',0.00,1250.00,1),(9,6,3,'Monitor 24\"','Samsung',1.00,32.00,'ARS',0.00,32.00,2),(10,7,2,'Mouse InalÃ¡mbrico','Logitech',2.00,25.00,'USD',0.00,50.00,1),(11,7,4,'test','tarara',1.00,100.00,'USD',0.00,100.00,2),(12,8,3,'Monitor 24\"','Samsung',2.00,180.00,'ARS',10.00,324.00,1),(13,9,2,'Mouse InalÃ¡mbrico','Logitech',3.00,25.00,'ARS',0.00,75.00,1),(14,9,1,'Notebook 16GB','Dell',1.00,1200.00,'ARS',0.00,1200.00,2),(15,9,4,'test','tarara',2.00,100.00,'ARS',0.00,200.00,3),(16,9,3,'Monitor 24\"','Samsung',1.00,180.00,'ARS',0.00,180.00,4),(17,10,2,'Mouse InalÃ¡mbrico','Logitech',5.00,25.00,'ARS',10.00,112.50,1);
/*!40000 ALTER TABLE `quote_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned NOT NULL,
  `quote_number` varchar(40) NOT NULL,
  `created_by_user_id` bigint unsigned NOT NULL,
  `customer_id` bigint unsigned DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'DRAFT',
  `currency` char(3) NOT NULL DEFAULT 'USD',
  `notes` text,
  `valid_until` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_quotes_company_number` (`company_id`,`quote_number`),
  KEY `idx_quotes_company` (`company_id`),
  KEY `fk_quotes_created_by` (`created_by_user_id`),
  KEY `fk_quotes_customer` (`customer_id`),
  CONSTRAINT `fk_quotes_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_quotes_created_by` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_quotes_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
INSERT INTO `quotes` VALUES (2,1,'0000001',2,1,'DRAFT','USD','Presupuesto demo','2025-12-28','2025-12-13 13:50:36'),(3,1,'0000003',2,1,'DRAFT','USD',NULL,'2025-12-28','2025-12-15 14:50:23'),(4,1,'0000004',2,1,'DRAFT','USD',NULL,'2025-12-28','2025-12-15 14:57:40'),(5,1,'0000005',2,4,'DRAFT','USD',NULL,'2025-12-15','2025-12-15 16:33:05'),(6,1,'0000006',2,6,'DRAFT','ARS',NULL,'2025-12-15','2025-12-15 17:46:40'),(7,1,'0000007',2,3,'DRAFT','USD',NULL,'2025-12-15','2025-12-15 18:19:40'),(8,1,'0000008',2,6,'DRAFT','ARS',NULL,'2025-12-16','2025-12-15 20:25:43'),(9,1,'0000009',2,2,'DRAFT','ARS',NULL,'2025-12-15','2025-12-15 20:34:01'),(10,1,'0000010',2,4,'DRAFT','ARS',NULL,'2025-12-16','2025-12-15 20:56:28');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) NOT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN','Administrator'),(2,'SALES','Sales'),(3,'VIEWER','Viewer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_user_roles_role` (`role_id`),
  CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (2,1);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_id` bigint unsigned NOT NULL,
  `first_name` varchar(80) NOT NULL,
  `last_name` varchar(80) NOT NULL,
  `email` varchar(160) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_company_email` (`company_id`,`email`),
  CONSTRAINT `fk_users_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,1,'Gonzalo','De Castro','gonza@demo.com','$2b$10$Zwk8FKnkmh4d2LhxBLvmzOc7AI9rHYINFAYz8TO0OjhXnv2rkCZ7C',1,'2025-12-13 13:42:38'),(3,2,'Juan','Gonzalez','juangonzalez@gmail.com','$2b$10$Qs683Y4FqfNOnf6K7oPqqOikeuqaNw6TZXLdkEoZ.tlk417tXwahi',1,'2025-12-15 20:47:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-18 14:05:53
