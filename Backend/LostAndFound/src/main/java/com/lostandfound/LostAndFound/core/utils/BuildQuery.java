package com.lostandfound.LostAndFound.core.utils;

import com.lostandfound.LostAndFound.core.bo.FilterOptions;
import com.lostandfound.LostAndFound.core.bo.LafLocation;
import com.lostandfound.LostAndFound.core.bo.SearchFilter;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.regex.Pattern;

import com.lostandfound.LostAndFound.core.exception.LostAndFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class BuildQuery {

  private static final double EARTH_RADIUS_METERS = 6371000.0;
  public static Query buildQuery(SearchFilter searchFilter) {
    Query query = new Query();

    for (Map.Entry<String, FilterOptions> filters : searchFilter.getFilters().entrySet()) {
      Criteria criteria = buildCriteria(filters);
      query.addCriteria(criteria);
    }

    applySort(searchFilter, query);

    return query;
  }

//  private static Criteria buildCriteria(Map.Entry<String, FilterOptions> filters) {
//    Criteria criteria = new Criteria();
//    String key = filters.getKey();
//    FilterOptions filterOptions = filters.getValue();
//    Object value = filterOptions.getValue();
//    String mode = filterOptions.getMode();
//
//    criteria = criteria.where(key);
//
//    switch (mode) {
//      case "in":
//        addInCriteria(criteria, value);
//        break;
//      case "contains":
//        addContainsCriteria(criteria, key, value);
//        break;
//      case "is":
//      case "equals":
//        addEqualsCriteria(criteria, value);
//        break;
//      case "gt":
//        addGtCriteria(criteria, value);
//        break;
//      case "lt":
//        addLtCriteria(criteria, value);
//        break;
//      case "gte":
//        addGteCriteria(criteria, value);
//        break;
//      case "lte":
//        addLteCriteria(criteria, value);
//        break;
//      case "geo":
//        addGeoCriteria(criteria, value);
//        break;
//      default:
//        handleInvalidFilter();
//    }
//
//    return criteria;
//  }

  private static final Map<String, BiConsumer<Criteria, Object>> MODE_HANDLERS = new HashMap<>();

  static {
    MODE_HANDLERS.put("in", BuildQuery::addInCriteria);
    MODE_HANDLERS.put("contains", BuildQuery::addContainsCriteria);
    MODE_HANDLERS.put("is", BuildQuery::addEqualsCriteria);
    MODE_HANDLERS.put("equals", BuildQuery::addEqualsCriteria);
    MODE_HANDLERS.put("gt", BuildQuery::addGtCriteria);
    MODE_HANDLERS.put("lt", BuildQuery::addLtCriteria);
    MODE_HANDLERS.put("gte", BuildQuery::addGteCriteria);
    MODE_HANDLERS.put("lte", BuildQuery::addLteCriteria);
    MODE_HANDLERS.put("geo", BuildQuery::addGeoCriteria);
  }

  private static Criteria buildCriteria(Map.Entry<String, FilterOptions> filters) {
    Criteria criteria = new Criteria();
    String key = filters.getKey();
    FilterOptions filterOptions = filters.getValue();
    Object value = filterOptions.getValue();
    String mode = filterOptions.getMode();

    criteria = criteria.where(key);

    MODE_HANDLERS.getOrDefault(mode, BuildQuery::handleInvalidFilter)
            .accept(criteria, value);

    return criteria;
  }

  private static void handleInvalidFilter(Criteria criteria, Object o) {
    // add logging in future.
    throw new LostAndFoundException("Invalid filter.");
  }

  private static void addInCriteria(Criteria criteria, Object value) {
    if (value instanceof Collection<?>) {
      criteria.in(value);
    }
  }

  private static void addContainsCriteria(Criteria criteria, Object value) {
    if (value instanceof String) {
        Criteria titleCriteria = Criteria.where("title").regex(Pattern.quote((String) value), "i");
        Criteria descriptionCriteria = Criteria.where("description").regex(Pattern.quote((String) value), "i");
        criteria.orOperator(
                titleCriteria, descriptionCriteria
        );
      } else {
        criteria.regex(Pattern.quote((String) value), "i");
      }
  }


  private static void addEqualsCriteria(Criteria criteria, Object value) {
    if (value instanceof Number) {
      criteria.is(value);
    } else if (value instanceof Date) {
      criteria.is(value);
    } else if (value instanceof String) {
      criteria.is(value);
    } else if (value instanceof Boolean) {
      criteria.is(value);
    }
  }

  private static void addGtCriteria(Criteria criteria, Object value) {
    if (value instanceof Number) {
      criteria.gt(value);
    } else if (value instanceof Date) {
      criteria.gt(value);
    }
  }

  private static void addLtCriteria(Criteria criteria, Object value) {
    if (value instanceof Number) {
      criteria.lt(value);
    } else if (value instanceof Date) {
      criteria.lt(value);
    }
  }

  private static void addGteCriteria(Criteria criteria, Object value) {
    if (value instanceof Number) {
      criteria.gte(value);
    } else if (value instanceof Date) {
      criteria.gte(value);
    }
  }

  private static void addLteCriteria(Criteria criteria, Object value) {
    if (value instanceof Number) {
      criteria.lte(value);
    } else if (value instanceof Date) {
      criteria.lte(value);
    }
  }

  private static void addGeoCriteria(Criteria criteria, Object value) {
    if (value instanceof LafLocation) {
      LafLocation location = (LafLocation) value;
      Double longitude = location.getX();
      Double latitude = location.getY();
      Double radius = location.getRadius() / EARTH_RADIUS_METERS;
      criteria = new Criteria("location")
              .nearSphere(new Point(longitude, latitude))
              .maxDistance(radius);
    }
  }

  private static void applySort(SearchFilter searchFilter, Query query) {
    if (searchFilter.getSortField() != null) {
      query.with(Sort.by(searchFilter.getSortDirection(), searchFilter.getSortField()));
    }
  }
}
