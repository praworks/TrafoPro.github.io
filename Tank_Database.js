		// DATABASE
		// Define material object keys: StandardsEN HV 50180, LV EN 50386
		const materialProperties = {
			lvPorcelain1kV250A: { height: 184, weight: 0.43 * 4, length: 0 },
			lvPorcelain1kV630A: { height: 240, weight: 1.16 * 4, length: 0 },
			lvPorcelain1kV1250A: { height: 245, weight: 2.73 * 4, length: 0 },
			lvPorcelain1x1kV2000A: { height: 311, weight: 6.24 * 4, length: 0 },
			lvPorcelain2x1kV2000A: { height: 311, weight: 2 * 6.24 * 4, length: 0 },
			lvPorcelain1x1kV3150A: { height: 331, weight: 8.45 * 4, length: 0 },
			lvPorcelain2x1kV3150A: { height: 331, weight: 2 * 8.45 * 4, length: 0 },
			lvPorcelain1kV250Acb: { height: 398, weight: 100, length: 860 },
			lvPorcelain1kV630Acb: { height: 398, weight: 100, length: 860 },
			lvPorcelain1kV1250Acb: { height: 398, weight: 100, length: 935 },
			lvPorcelain1x1kV2000Acb: { height: 468, weight: 140, length: 1021 }, // 1021 verified
			lvPorcelain2x1kV2000Acb: { height: 468, weight: 140, length: 1021 },
			lvPorcelain1x1kV3150Acb: { height: 488, weight: 150, length: 1021 },
			lvPorcelain2x1kV3150Acb: { height: 488, weight: 180, length: 1185 },
			lvCastResinMonoblock1700Acb: { height: 385, weight: 100 * 4, length: 867 }, // Approximate weight
			lvCastResinMonoblock1700A: { weight: 17.100}, // https://www.reinhausen.com/fileadmin/downloadcenter/products/bushing/epoxy/cedaspe_mon/td_monoblock_en.pdf

			hvPorcelain12kV250AP1: { height: 274, weight: 3.75 * 3, length: 0 },
			hvPorcelain12kV250AP2: { height: 274, weight: 3.75 * 3, length: 0 },
			hvPorcelain12kV250AP4: { height: 388, weight: 5.65 * 3, length: 0 },
			hvPorcelain24kV250AP2: { height: 388, weight: 5.65 * 3, length: 0 },
			hvPorcelain24kV250AP3: { height: 441, weight: 6.65 * 3, length: 0 },
			hvPorcelain24kV250AP4: { height: 600, weight: 9.35 * 3, length: 0 },
			hvPorcelain36kV250AP1: { height: 441, weight: 6.65 * 3, length: 0 },
			hvPorcelain36kV250AP3: { height: 600, weight: 9.35 * 3, length: 0 },
			hvPorcelain36kV250AP4: { height: 600, weight: 12.55 * 3, length: 0 },
			hvEpoxy12_24KV250AinterfaceA: { height: 150, weight: 1.652 * 3, length: 0 }, // Approximate height
			hvEpoxy12kV630AinterfaceC: { height: 150, weight: 1.652 * 3, length: 0 }, // Approximate height
			hvEpoxy36kV250AinterfaceB: { height: 150, weight: 1.652 * 3, length: 0 }, // Approximate height
			hvEpoxy36kV400AinterfaceB: { height: 150, weight: 1.652 * 3, length: 0 }, // Approximate height
			hvEpoxy36kV630AinterfaceC: { height: 150, weight: 1.652 * 3, length: 0 }, // Approximate height
			hvEpoxyCbL510: { height: 421, length: 862.5, weight: 80 }, // if ISD is selected add ISD height, if not add 55mm // Verified
			hvEpoxyCbL610: { height: 421, length: 962.5, weight: 90 }, // if ISD is selected add ISD height, if not add 55mm // Verified
			hvEpoxyBushing1M100_630cb: { height: 415, length: 640, weight: 100 }, // if ISD is selected add ISD height, if not add 115mm
			hvEpoxyBushing1M800_1000cb: { height: 415, length: 862.5, weight: 120 }, // if ISD is selected add ISD height, if not add 115mm
			hvEpoxyBushing1M: { weight: 10 * 3 }, // Approximate weight

			HR20kV30A5POSL100: { height: 100, length: 500, weight: 3 },
			HM20kV63A5POSL131: { height: 131, length: 500, weight: 3 },
			HM20kV120A5POSL131: { height: 131, length: 500, weight: 3 },
			HR30kV30A5POSL100: { height: 100, length: 500, weight: 3 },
			HM30kV30A5POSL131: { height: 131, length: 500, weight: 3 },

			hvSurgeArresterMountingBelow401TypA: { length: 300, weight: 20 }, // Approximate weight
			hvSurgeArresterMountingAbove400TypA: { length: 390, weight: 20 }, // Approximate weight
			hvSurgeArresterMountingTypB: { length: 490, weight: 20 }, // Approximate weight

			CompositeSurgeArrester: { length: 176.8, weight: 20 }, // Approximate length weight
			marshallingBox: { toFinGap: 100, length: 400, weight: 25 }, // Approximate length weight

			ISD: { height: 282, weight: 2.016 }, // highest source Cedaspe catalogue // DMCR Weight
			MagOLI: { height: 245, weight: 0.300 }, // Approximate weight
			bossMagOli: { weight: 1 }, // Approximate weight
			NonMagOLI: { height: 230, weight: 0.255 }, // source CT-2322
			bossNonMagOli: { weight: 0.79008 },
			PRV: { height: 240, weight: 0.278 },
			bossPrv: { weight: 1 }, // Approximate weight
			thermometerPocket: { weight: .22564 },
			Thermowell: { weight: .37492 }, 
			drainValve: { weight: 0.727 },
			OTI: { weight: .100 }, // Approximate weight
			WTI: { weight: .100 }, // Approximate weight 
			CT: { weight: .100 }, // Approximate weight

			phaseMarkingPlate: { length: 10 },
			radiatorRod: { dia: 8 },
			radiatorAdjustment: { length: 3 },
			radiatorFlangeOverlap: { length: 10 },
			ratingPlateDistanceToCase: { length: 95 },
			drainValveTopAllowance: { height: 100 },
			drainValveBottomAllowance: { height: 40 },

			// AS PER ISMB
			L50x50x6: { height: 50, width: 50, thickness: 6, weight: 4.46 },
			L75x75x6: { height: 75, width: 75, thickness: 6, weight: 6.8 },
			L75x75x10: { height: 75, width: 75, thickness: 10, weight: 9.6 },
			L125x75x8: { height: 125, width: 75, thickness: 8, weight: 13.1 },

			// AS PER ISMC
			C75x40x4_8: { height: 75, width: 40, thickness: 4.8, weight: 7.14 },
			C100x50x5: { height: 50, width: 100, thickness: 5, weight: 9.56 },
			C150x75x6_5: { height: 75, width: 150, thickness: 6.5, weight: 17.7 },
			C250x80x9: { height: 75, width: 250, thickness: 9, weight: 27.9 },
			H150x150x10: { height: 150, width: 150, thickness: 10, weight: 37.3 },

			// kvaBaseDimension
			BD100kVA: { longSideDimension: 420, shortSideDimension: 520 },
			BD160kVA: { longSideDimension: 520, shortSideDimension: 520 },
			BD250kVA: { longSideDimension: 520, shortSideDimension: 520 },
			BD400kVA: { longSideDimension: 670, shortSideDimension: 670 },
			BD630kVA: { longSideDimension: 700, shortSideDimension: 680 },
			BD800kVA: { longSideDimension: 700, shortSideDimension: 680 },
			BD1000kVA: { longSideDimension: 800, shortSideDimension: 680 },
			BD1250kVA: { longSideDimension: 900, shortSideDimension: 900 },
			BD1600kVA: { longSideDimension: 900, shortSideDimension: 900 },
			BD2000kVA: { longSideDimension: 900, shortSideDimension: 1000 },
			BD2500kVA: { longSideDimension: 900, shortSideDimension: 1000 },
			BD3150kVA: { longSideDimension: 900, shortSideDimension: 1000 },

			Wh_125_1200: { height: 152, width: 66, weight: 3.2 * 4 },
			Wh_125_2500: { height: 152, width: 74, weight: 3.9 * 4 },
			Wh_160_4000: { height: 195, width: 84, weight: 6.7 * 4 },
			Wh_200_6000: { height: 230, width: 120, weight: 15.75 * 4 },

			palletWeight: { weight: 25 },

			EN10025S235JR: { density: 7850 / 1000000000 },
			CORKTD1120: { density: 850 / 1000000000 },
		};